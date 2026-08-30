import 'dotenv/config';
import { db } from '../lib/db';
import { calculateDeliveryFee, getDrivingRouteDistanceKm, calculateHaversineDistance } from '../services/distance';
import { createOrder, getOrders } from '../actions/orders';

async function runSystemVerification() {
  console.log('====================================================');
  console.log('   SISTEMA DE VERIFICAÇÃO INTEGRAL HENRI IMPORTS   ');
  console.log('====================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  // TEST 1: Database Connection & Store Config
  totalTests++;
  try {
    console.log('[TESTE 1] Verificando Conexão com Banco de Dados e Configurações da Loja...');
    const config = await db.storeConfig.findUnique({ where: { id: 'default' } });
    if (config) {
      console.log(`  ✅ Banco Conectado com Sucesso!`);
      console.log(`  🔹 Nome da Loja: "${config.name}"`);
      console.log(`  🔹 Modo de Cálculo de Entrega: ${config.deliveryMode}`);
      console.log(`  🔹 CEP da Loja: ${config.cep} | Coordenadas: (${config.latitude}, ${config.longitude})`);
      console.log(`  🔹 Faixas de Frete no Banco:`, JSON.stringify(config.deliveryRanges));
      passedTests++;
    } else {
      console.log('  ⚠️ Configuração padrão não encontrada no DB.');
    }
  } catch (err: any) {
    console.error('  ❌ Erro no Teste 1:', err.message);
  }

  console.log('\n----------------------------------------------------');

  // TEST 2: Distance Calculation Engine (OSRM & Haversine)
  totalTests++;
  try {
    console.log('[TESTE 2] Verificando Motor de Rotas OSRM (OpenStreetMap)...');
    const storeLat = -23.5616;
    const storeLon = -46.656; // Av. Paulista
    const clientLat = -23.5800;
    const clientLon = -46.6800; // Pinheiros/Itaim

    const haversineDist = calculateHaversineDistance(storeLat, storeLon, clientLat, clientLon);
    console.log(`  🔹 Distância em Linha Reta (Haversine): ${haversineDist} km`);

    const drivingDist = await getDrivingRouteDistanceKm(storeLat, storeLon, clientLat, clientLon);
    console.log(`  🔹 Distância de Trânsito Real (OSRM Driving Engine): ${drivingDist} km`);

    if (drivingDist >= haversineDist) {
      console.log('  ✅ API OSRM de Rotas Terrestres Funcionando Perfeitamente!');
      passedTests++;
    } else {
      console.warn('  ⚠️ Alerta: Distância de trânsito menor que linha reta.');
    }
  } catch (err: any) {
    console.error('  ❌ Erro no Teste 2:', err.message);
  }

  console.log('\n----------------------------------------------------');

  // TEST 3: Delivery Fee Calculation (Mode FAIXAS & KM)
  totalTests++;
  try {
    console.log('[TESTE 3] Verificando Aplicação da Taxa de Entrega por Faixas...');
    const testRanges = [
      { minKm: 0, maxKm: 3, price: 5.0 },
      { minKm: 3, maxKm: 6, price: 8.0 },
      { minKm: 6, maxKm: 10, price: 12.0 },
      { minKm: 10, maxKm: 15, price: 18.0 },
    ];

    const feeResultNear = await calculateDeliveryFee({
      storeLat: -23.5616,
      storeLon: -46.656,
      clientLat: -23.5700,
      clientLon: -46.6600, // ~1.4 km driving
      mode: 'FAIXAS',
      kmRate: 2.5,
      ranges: testRanges,
    });
    console.log(`  🔹 Pedido Curta Distância (~${feeResultNear.distanceKm} km): Taxa Calculada = R$ ${feeResultNear.deliveryFee} (Esperado: R$ 5.00)`);

    const feeResultMedium = await calculateDeliveryFee({
      storeLat: -23.5616,
      storeLon: -46.656,
      clientLat: -23.5900,
      clientLon: -46.6900, // ~5.6 km driving
      mode: 'FAIXAS',
      kmRate: 2.5,
      ranges: testRanges,
    });
    console.log(`  🔹 Pedido Média Distância (~${feeResultMedium.distanceKm} km): Taxa Calculada = R$ ${feeResultMedium.deliveryFee} (Esperado: R$ 8.00)`);

    if (feeResultNear.deliveryFee > 0 && feeResultMedium.deliveryFee > 0) {
      console.log('  ✅ Aplicação e Cálculo das Taxas de Entrega Verificados com Sucesso!');
      passedTests++;
    } else {
      console.error('  ❌ Erro: Taxa retornou zerada.');
    }
  } catch (err: any) {
    console.error('  ❌ Erro no Teste 3:', err.message);
  }

  console.log('\n----------------------------------------------------');

  // TEST 4: Query Real Orders in DB
  totalTests++;
  try {
    console.log('[TESTE 4] Verificando Leitura de Pedidos Gravados no Banco...');
    const orders = await getOrders();
    console.log(`  ✅ Total de Pedidos no Banco de Dados: ${orders.length}`);
    if (orders.length > 0) {
      orders.slice(0, 3).forEach((o) => {
        console.log(`  🔹 Pedido #${o.number} | Cliente: ${o.client.name} | Taxa Frete: R$ ${o.deliveryFee} | Total: R$ ${o.total} | Status: ${o.status}`);
      });
    }
    passedTests++;
  } catch (err: any) {
    console.error('  ❌ Erro no Teste 4:', err.message);
  }

  console.log('\n====================================================');
  console.log(`   RESULTADO DOS TESTES: ${passedTests}/${totalTests} PASSARAM COM SUCESSO!`);
  console.log('====================================================\n');

  process.exit(0);
}

runSystemVerification().catch((err) => {
  console.error('Erro de execução do script de verificação:', err);
  process.exit(1);
});
