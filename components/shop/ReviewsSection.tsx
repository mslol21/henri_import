'use client';

import React from 'react';
import { mockReviews } from '@/lib/mockData';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export function ReviewsSection() {
  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
            DEPOIMENTOS DE CLIENTES
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl mt-1">
            O que dizem sobre a Henri Imports
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Milhares de entregas realizadas com máximo sigilo, agilidade e produtos 100% autênticos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockReviews.map((rev, i) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col justify-between p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs relative"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-purple-200" />
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{rev.name}</h4>
                  <span className="text-[10px] text-slate-400">{rev.date}</span>
                </div>
                {rev.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <CheckCircle className="h-3 w-3" />
                    <span>Compra Verificada</span>
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
