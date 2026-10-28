import React, { useState, useMemo } from 'react';
import { CartItem } from '../types';
import { ShoppingCart, Trash2, Plus, Minus, MessageCircle, ArrowRight, ChevronDown, ChevronUp, Clock, Calendar, User } from 'lucide-react';
import { PRODUCTS } from '../data/products';

interface OrderCartProps {
  items: CartItem[];
  isMinimized: boolean;
  onToggle: () => void;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

const getEasterDate = (year: number): Date => {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month, day);
};

const isStoreClosedDay = (date: Date): boolean => {
  if (date.getDay() === 0) return true;

  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  const isFixedHoliday =
    (month === 0 && day === 1) ||
    (month === 3 && day === 21) ||
    (month === 4 && day === 1) ||
    (month === 6 && day === 9) || // 09/07 Estadual SP
    (month === 8 && day === 7) ||
    (month === 9 && day === 12) ||
    (month === 10 && day === 2) ||
    (month === 10 && day === 15) ||
    (month === 10 && day === 20) ||
    (month === 11 && day === 25);

  if (isFixedHoliday) return true;

  const easter = getEasterDate(year);
  const oneDay = 24 * 60 * 60 * 1000;
  const carnival = new Date(easter.getTime() - 47 * oneDay);
  const goodFriday = new Date(easter.getTime() - 2 * oneDay);
  const corpusChristi = new Date(easter.getTime() + 60 * oneDay);

  const isSameDate = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  return isSameDate(date, carnival) || isSameDate(date, goodFriday) || isSameDate(date, corpusChristi);
};

const getDayOperatingHours = (date: Date) => {
  if (isStoreClosedDay(date)) return { isOpen: false, start: 0, end: 0 };
  if (date.getDay() === 6) return { isOpen: true, start: 8, end: 15 };
  return { isOpen: true, start: 10, end: 19 };
};

export const OrderCart: React.FC<OrderCartProps> = ({ 
  items, 
  isMinimized,
  onToggle,
  onUpdateQuantity, 
  onRemoveItem,
  onClearCart
}) => {
  const [customerName, setCustomerName] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');

  const totalOrder = items.reduce((sum, item) => sum + item.total, 0);

  const LEAD_TIMES = {
    salgado: 60,
    doce: 7,
    bolo: 4
  };

  const pickupConstraints = useMemo(() => {
    if (items.length === 0) return null;

    let hasSalgado = false;
    let hasDoce = false;
    let hasBolo = false;

    items.forEach(item => {
      const lower = item.name.toLowerCase();
      const product = PRODUCTS.find(p => p.name.toLowerCase() === lower);
      const cats = product?.categories || [];

      if (
        cats.includes('salgados') ||
        lower.includes('esfiha') || lower.includes('enroladinho') || 
        lower.includes('coxinha') || lower.includes('rissole') || 
        lower.includes('empada') || lower.includes('quiche') || 
        lower.includes('croquete') || lower.includes('queijo')
      ) {
        hasSalgado = true;
      } else if (
        cats.includes('docinhos') ||
        lower.includes('brigadeiro') || lower.includes('beijinho') || 
        lower.includes('bicho de pé') || lower.includes('trufa') || 
        lower.includes('tortinha')
      ) {
        hasDoce = true;
      } else {
        hasBolo = true;
      }
    });

    let requiredLeadHours = 0;
    let bottleneckName = '';

    if (hasSalgado) {
      requiredLeadHours = LEAD_TIMES.salgado;
      bottleneckName = 'Salgados (mínimo de 60 horas)';
    } else if (hasDoce) {
      requiredLeadHours = LEAD_TIMES.doce;
      bottleneckName = 'Docinhos (mínimo de 7 horas de preparo)';
    } else if (hasBolo) {
      requiredLeadHours = LEAD_TIMES.bolo;
      bottleneckName = 'Bolos & Tortas (mínimo de 4 horas)';
    }

    const now = new Date();
    let current = new Date(now);

    const advanceToStoreOpen = (d: Date) => {
      while (true) {
        if (isStoreClosedDay(d)) {
          d.setDate(d.getDate() + 1);
          d.setHours(0, 0, 0, 0);
          continue;
        }

        const { start, end } = getDayOperatingHours(d);
        if (d.getHours() >= end) {
          d.setDate(d.getDate() + 1);
          d.setHours(0, 0, 0, 0);
          continue;
        }
        if (d.getHours() < start) {
          d.setHours(start, 0, 0, 0);
          break;
        }
        break;
      }
    };

    advanceToStoreOpen(current);

    if (requiredLeadHours <= 9) {
      let remMinutes = requiredLeadHours * 60;
      while (remMinutes > 0) {
        if (isStoreClosedDay(current)) {
          current.setDate(current.getDate() + 1);
          current.setHours(0, 0, 0, 0);
          continue;
        }
        const { start, end } = getDayOperatingHours(current);
        if (current.getHours() < start) current.setHours(start, 0, 0, 0);

        const closingTime = new Date(current).setHours(end, 0, 0, 0);
        const minsLeftToday = (closingTime - current.getTime()) / (1000 * 60);

        if (remMinutes <= minsLeftToday) {
          current = new Date(current.getTime() + remMinutes * 60 * 1000);
          remMinutes = 0;
        } else {
          remMinutes -= minsLeftToday;
          current.setDate(current.getDate() + 1);
          current.setHours(0, 0, 0, 0);
        }
      }
    } else {
      current = new Date(current.getTime() + requiredLeadHours * 60 * 60 * 1000);
      while (true) {
        if (isStoreClosedDay(current)) {
          current.setDate(current.getDate() + 1);
          current.setHours(0, 0, 0, 0);
          continue;
        }
        const { start, end } = getDayOperatingHours(current);
        if (current.getHours() >= end) {
          current.setDate(current.getDate() + 1);
          current.setHours(0, 0, 0, 0);
          continue;
        }
        if (current.getHours() < start) {
          current.setHours(start, 0, 0, 0);
          break;
        }
        break;
      }
    }

    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, '0');
    const day = String(current.getDate()).padStart(2, '0');
    const minDateStr = `${year}-${month}-${day}`;

    return { 
      minDateStr, 
      earliestDate: current, 
      requiredLeadHours, 
      bottleneckName,
      hasSalgado,
      hasDoce,
      hasBolo
    };
  }, [items]);

  const availableTimes = useMemo(() => {
    if (!pickupDate || !pickupConstraints) return [];

    const [y, m, d] = pickupDate.split('-').map(Number);
    const selectedDate = new Date(y, m - 1, d);

    if (isStoreClosedDay(selectedDate)) return [];

    const { start, end } = getDayOperatingHours(selectedDate);
    const times: string[] = [];

    for (let h = start; h < end; h++) {
      const slotTime = new Date(y, m - 1, d, h, 0, 0);
      if (slotTime >= pickupConstraints.earliestDate) {
        times.push(`${String(h).padStart(2, '0')}:00`);
      }
    }
    return times;
  }, [pickupDate, pickupConstraints]);

  const handleCheckout = () => {
    if (items.length === 0) return;
    if (!customerName.trim()) {
      alert('Por favor, informe o seu nome para identificação do pedido.');
      return;
    }
    if (!pickupDate || !pickupTime) {
      alert('Por favor, selecione o dia e horário para retirada.');
      return;
    }

    let orderDetails = '';
    items.forEach(item => {
      orderDetails += `• ${item.name}: ${item.quantity}${item.unit} — R$ ${item.total.toFixed(2).replace('.', ',')}\n`;
    });

    const formattedDate = new Date(pickupDate + 'T00:00:00').toLocaleDateString('pt-BR');
    const message = encodeURIComponent(
      `Olá Sweets & Cakes! Gostaria de realizar o seguinte pedido:\n\n*Cliente:* ${customerName.trim()}\n\n*Itens:* \n${orderDetails}\n*Retirada Prevista:* ${formattedDate} às ${pickupTime}\n*Total Estimado:* R$ ${totalOrder.toFixed(2).replace('.', ',')}\n\nPor favor, confirme a disponibilidade.`
    );

    window.open(`https://wa.me/551136616921?text=${message}`, '_blank');
  };

  if (items.length === 0 && isMinimized) return null;

  return (
    <section className="fixed bottom-24 inset-x-0 sm:left-auto sm:right-6 z-[60] flex flex-col items-end pointer-events-none px-4 sm:px-0 w-full sm:w-96">
      <div className={`bg-cream-pure rounded-2xl shadow-2xl border border-gold-border/40 w-full overflow-hidden pointer-events-auto flex flex-col transition-all duration-500 transform ${isMinimized ? 'h-14 translate-y-0' : 'max-h-[85vh]'}`}>
        <div 
          className="bg-chocolate-deep p-4 flex items-center justify-between text-cream-base cursor-pointer hover:bg-chocolate-roast transition-colors"
          onClick={onToggle}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingCart size={20} className="text-gold-accent" />
              <span className="absolute -top-2 -right-2 bg-berry-red text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-chocolate-deep">
                {items.length}
              </span>
            </div>
            <span className="font-headline text-lg tracking-wide">Meu Pedido</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); onClearCart(); }}
              className="text-[10px] font-bold uppercase tracking-widest text-sand-light hover:text-white transition-colors"
            >
              Limpar
            </button>
            {isMinimized ? <ChevronUp size={20} className="text-gold-accent" /> : <ChevronDown size={20} className="text-gold-accent" />}
          </div>
        </div>

        {!isMinimized && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/50">
              {items.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <ShoppingCart size={40} className="mx-auto text-tan-pale/40" />
                  <p className="text-sm font-headline text-coffee-muted">Seu pedido está vazio</p>
                  <p className="text-[10px] uppercase tracking-widest text-gold-muted font-bold">Escolha seus produtos no cardápio</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {items.map((item) => {
                      const lower = item.name.toLowerCase();
                      const product = PRODUCTS.find(p => p.name.toLowerCase() === lower);
                      const isSalgado = (product?.categories || []).includes('salgados') || 
                                        lower.includes('esfiha') || lower.includes('enroladinho') || 
                                        lower.includes('coxinha') || lower.includes('rissole') || 
                                        lower.includes('empada') || lower.includes('quiche') || 
                                        lower.includes('croquete');

                      return (
                        <div key={item.id} className="flex items-start justify-between gap-4 pb-4 border-b border-tan-pale/20 last:border-0 last:pb-0">
                          <div className="flex-1">
                            <h4 className="font-headline text-sm font-bold text-chocolate-deep leading-tight">{item.name}</h4>
                            <p className="text-xs text-coffee-muted mt-1 font-bold">
                              R$ {item.price.toFixed(2).replace('.', ',')} / {item.unit}
                            </p>
                          </div>
                          
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center bg-cream-soft rounded-lg p-1 border border-tan-pale/30">
                              <button 
                                onClick={() => {
                                  let step = 1;
                                  let min = 1;
                                  if (isSalgado || item.unit === 'cento') {
                                    step = 25;
                                    min = 25;
                                  } else if (item.unit === 'kg') {
                                    step = 0.5;
                                    min = 0.5;
                                  }
                                  let newQuantity = item.quantity - step;
                                  if (newQuantity < min) newQuantity = min;
                                  if (isSalgado || item.unit === 'cento') {
                                    newQuantity = Math.max(min, Math.round(newQuantity / 25) * 25);
                                  }
                                  onUpdateQuantity(item.id, newQuantity);
                                }}
                                className="p-1 hover:text-secondary transition-colors"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-xs font-bold min-w-[44px] text-center">
                                {item.quantity}{item.unit}
                              </span>
                              <button 
                                onClick={() => {
                                  let step = 1;
                                  if (isSalgado || item.unit === 'cento') {
                                    step = 25;
                                  } else if (item.unit === 'kg') {
                                    step = 0.5;
                                  }
                                  let newQuantity = item.quantity + step;
                                  if (isSalgado || item.unit === 'cento') {
                                    newQuantity = Math.round(newQuantity / 25) * 25;
                                  }
                                  onUpdateQuantity(item.id, newQuantity);
                                }}
                                className="p-1 hover:text-secondary transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-bold text-chocolate-roast">
                                R$ {item.total.toFixed(2).replace('.', ',')}
                              </span>
                              <button 
                                onClick={() => onRemoveItem(item.id)}
                                className="text-berry-red hover:scale-110 transition-transform"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Agendamento com Campo de Nome */}
                  <div className="mt-6 p-4 bg-gold-accent/5 rounded-xl border border-gold-accent/15 space-y-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock size={16} className="text-gold-accent" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-chocolate-deep">Dados para Retirada</span>
                    </div>

                    {/* Campo Nome do Cliente */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-sand-dark">Seu Nome Completo</label>
                      <div className="relative">
                        <User className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gold-accent" size={15} />
                        <input 
                          type="text" 
                          placeholder="Digite seu nome para o pedido"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 bg-white border border-tan-pale/40 rounded-lg text-xs font-medium text-chocolate-deep outline-none focus:ring-1 focus:ring-gold-accent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-sand-dark">Data</label>
                        <div className="relative">
                          <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gold-accent" size={15} />
                          <input 
                            type="date" 
                            min={pickupConstraints?.minDateStr}
                            value={pickupDate}
                            onChange={(e) => {
                              const chosen = e.target.value;
                              if (chosen) {
                                const [y, m, d] = chosen.split('-').map(Number);
                                const checkDate = new Date(y, m - 1, d);
                                if (isStoreClosedDay(checkDate)) {
                                  alert('Não abrimos aos domingos e feriados. Escolha um dia útil ou sábado.');
                                  setPickupDate('');
                                  setPickupTime('');
                                  return;
                                }
                              }
                              setPickupDate(chosen);
                              setPickupTime('');
                            }}
                            className="w-full pl-8 pr-2 py-2 bg-white border border-tan-pale/40 rounded-lg text-xs font-bold text-chocolate-deep outline-none focus:ring-1 focus:ring-gold-accent"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-sand-dark">Horário</label>
                        <div className="relative">
                          <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gold-accent" size={15} />
                          <select 
                            disabled={!pickupDate}
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                            className="w-full pl-8 pr-2 py-2 bg-white border border-tan-pale/40 rounded-lg text-xs font-bold text-chocolate-deep outline-none focus:ring-1 focus:ring-gold-accent disabled:opacity-50 appearance-none"
                          >
                            <option value="">--:--</option>
                            {availableTimes.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>

                    {pickupConstraints && (
                      <div className="p-3 bg-cream-soft rounded-lg border border-tan-pale/40 space-y-1">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-chocolate-deep">
                          <Clock size={13} className="text-gold-accent shrink-0" />
                          <span>Prazo de Produção: {pickupConstraints.bottleneckName}</span>
                        </div>
                        <p className="text-[10px] text-coffee-muted leading-tight">
                          Seg a Sex das 10h às 19h • Sábados das 8h às 15h • Domingos e Feriados: Fechado.<br />
                          Primeira data pronta: <strong className="text-chocolate-deep">{new Date(pickupConstraints.earliestDate).toLocaleDateString('pt-BR')} às {String(pickupConstraints.earliestDate.getHours()).padStart(2, '0')}:00</strong>.
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="p-4 bg-cream-soft border-t border-gold-border/20 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-coffee-muted">Total Estimado</span>
                <span className="font-headline text-2xl text-chocolate-deep font-bold">
                  R$ {totalOrder.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={items.length === 0 || !customerName.trim() || !pickupDate || !pickupTime}
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-chocolate-deep hover:bg-chocolate-roast text-cream-base text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
              >
                <MessageCircle size={18} className="text-gold-accent" />
                <span>Enviar Pedido WhatsApp</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};