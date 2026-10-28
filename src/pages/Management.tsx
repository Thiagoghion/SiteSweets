import React, { useState, useEffect } from 'react';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut, 
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';
import { 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  FileText, 
  MessageSquare, 
  Store, 
  Upload, 
  Check, 
  X,
  AlertTriangle 
} from 'lucide-react';
import { Product } from '../types';


// E-mails autorizados para acessar a gerência
const ALLOWED_EMAILS = [
  'admin@sweetsandcakes.com.br',
  'contato@sweetsandcakes.com.br'
  // Adicione seu e-mail pessoal aqui
];

export const Management: React.FC = () => {
  const auth = getAuth();
  const db = getFirestore();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  // Estados de Gerenciamento
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Configurações Adicionais (WhatsApp e PDF)
  const [whatsappTemplate, setWhatsappTemplate] = useState({
    header: 'Olá Sweets & Cakes! Gostaria de realizar o seguinte pedido:',
    footer: 'Por favor, confirme a disponibilidade e o valor com a pesagem final.'
  });
  const [pdfMenuUrl, setPdfMenuUrl] = useState('/cardapio.pdf');
  const [storeStatus, setStoreStatus] = useState({ isOpen: true, message: '' });
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Monitorar Autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (ALLOWED_EMAILS.includes(user.email || '')) {
          setCurrentUser(user);
          setAccessDenied(false);
          loadDashboardData();
        } else {
          setCurrentUser(null);
          setAccessDenied(true);
        }
      } else {
        setCurrentUser(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error('Erro de autenticação:', err);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  // Carregar dados do Firestore
  const loadDashboardData = async () => {
    try {
      // 1. Carregar Produtos
      const prodSnapshot = await getDocs(collection(db, 'products'));
      const prods: Product[] = [];
      prodSnapshot.forEach((docSnap) => {
        prods.push({ id: docSnap.id, ...docSnap.data() } as Product);
      });
      setProductsList(prods);

      // 2. Carregar Configurações Gerais
      const configSnap = await getDocs(collection(db, 'storeSettings'));
      configSnap.forEach(d => {
        if (d.id === 'whatsapp') setWhatsappTemplate(d.data() as any);
        if (d.id === 'pdfMenu') setPdfMenuUrl(d.data().url || '/cardapio.pdf');
        if (d.id === 'status') setStoreStatus(d.data() as any);
      });
    } catch (err) {
      console.error('Erro ao ler Firestore:', err);
    }
  };

  // Salvar Produto (Novo ou Editado)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name) return;

    try {
      const prodId = editingProduct.id || editingProduct.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const docRef = doc(db, 'products', prodId);
      
      const payload = {
        name: editingProduct.name || '',
        description: editingProduct.description || '',
        price: Number(editingProduct.price) || 0,
        priceUnit: editingProduct.priceUnit || 'kg',
        categories: editingProduct.categories || ['bolos-finos'],
        tags: editingProduct.tags || ['Especial'],
        image: editingProduct.image || '/assets/aistudio/foto_bolo_sweets_and_cakes_3ea7270b.jpg'
      };

      await setDoc(docRef, payload, { merge: true });
      
      setEditingProduct(null);
      setIsCreating(false);
      loadDashboardData();
      triggerFeedback();
    } catch (err) {
      console.error('Erro ao gravar produto:', err);
    }
  };

  // Excluir Produto
  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Tem certeza de que deseja remover este produto?')) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      loadDashboardData();
      triggerFeedback();
    } catch (err) {
      console.error('Erro ao excluir:', err);
    }
  };

  // Salvar Configurações de WhatsApp e PDF
  const handleSaveSettings = async () => {
    try {
      await setDoc(doc(db, 'storeSettings', 'whatsapp'), whatsappTemplate);
      await setDoc(doc(db, 'storeSettings', 'pdfMenu'), { url: pdfMenuUrl });
      await setDoc(doc(db, 'storeSettings', 'status'), storeStatus);
      triggerFeedback();
    } catch (err) {
      console.error('Erro ao salvar configurações:', err);
    }
  };

  const triggerFeedback = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // ==========================================
  // TELAS DE BLOQUEIO E LOGIN
  // ==========================================
  if (authLoading) {
    return (
      <div className="min-h-screen bg-cream-base flex items-center justify-center">
        <p className="text-coffee-muted text-sm font-bold uppercase tracking-widest animate-pulse">
          Carregando Painel Administrativo...
        </p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-cream-base flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-tan-pale/40 max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-chocolate-deep text-gold-accent mx-auto flex items-center justify-center">
            <Lock size={32} />
          </div>
          <div>
            <h2 className="font-headline text-3xl font-bold text-chocolate-deep">Acesso Gerencial</h2>
            <p className="text-xs text-coffee-muted mt-2">
              Área restrita à administração da Sweets & Cakes.
            </p>
          </div>

          {accessDenied && (
            <div className="p-3 bg-berry-red/10 border border-berry-red/30 rounded-xl flex items-center gap-2 text-berry-red text-xs">
              <AlertTriangle size={18} className="shrink-0" />
              <span>Seu e-mail não possui permissão de acesso a este painel.</span>
            </div>
          )}

          <button
            onClick={handleLogin}
            className="w-full py-3.5 bg-chocolate-deep hover:bg-chocolate-roast text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
          >
            <ShieldCheck size={16} className="text-gold-accent" />
            <span>Entrar com Conta Google</span>
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // PAINEL DE CONTROLE AUTENTICADO
  // ==========================================
  return (
    <div className="min-h-screen bg-cream-base py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Cabeçalho do Painel */}
        <div className="bg-chocolate-deep text-cream-base p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg border border-gold-border/30">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gold-accent block">
              Sweets & Cakes Haute Pâtisserie
            </span>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-cream-pure">
              Painel de Gerenciamento
            </h1>
            <p className="text-xs text-sand-light mt-1">
              Conectado como: <strong>{currentUser.email}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            {saveSuccess && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700/80 text-white rounded-lg text-xs font-bold animate-fade-in">
                <Check size={14} /> Salvo com sucesso!
              </span>
            )}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-cream-base rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <LogOut size={14} />
              <span>Sair</span>
            </button>
          </div>
        </div>

        {/* Grade de Ferramentas Estratégicas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUNA 1 & 2: GERENCIAMENTO DE PRODUTOS */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-tan-pale/40 shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-tan-pale/30">
                <h3 className="font-headline text-2xl font-bold text-chocolate-deep">
                  Produtos & Cardápio ({productsList.length})
                </h3>
                <button
                  onClick={() => {
                    setEditingProduct({
                      name: '',
                      description: '',
                      price: 0,
                      priceUnit: 'kg',
                      categories: ['bolos-finos'],
                      tags: ['Novidade'],
                      image: '/assets/aistudio/foto_bolo_sweets_and_cakes_3ea7270b.jpg'
                    });
                    setIsCreating(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-chocolate-deep hover:bg-chocolate-roast text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <Plus size={14} className="text-gold-accent" />
                  <span>Novo Produto</span>
                </button>
              </div>

              {/* Tabela de Produtos */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-tan-pale/30 text-coffee-muted uppercase tracking-wider font-bold">
                      <th className="pb-3">Imagem</th>
                      <th className="pb-3">Nome</th>
                      <th className="pb-3">Preço</th>
                      <th className="pb-3">Categoria</th>
                      <th className="pb-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-tan-pale/20">
                    {productsList.map((prod) => (
                      <tr key={prod.id} className="hover:bg-cream-soft/40 transition-colors">
                        <td className="py-3">
                          <img 
                            src={prod.image || '/assets/aistudio/foto_bolo_sweets_and_cakes_3ea7270b.jpg'} 
                            alt={prod.name} 
                            className="w-10 h-10 rounded-lg object-cover border border-tan-pale/30"
                          />
                        </td>
                        <td className="py-3 font-bold text-chocolate-deep">{prod.name}</td>
                        <td className="py-3 text-chocolate-roast font-semibold">
                          R$ {Number(prod.price).toFixed(2).replace('.', ',')} /{prod.priceUnit || 'kg'}
                        </td>
                        <td className="py-3 text-coffee-muted">
                          {(prod.categories || []).join(', ')}
                        </td>
                        <td className="py-3 text-right space-x-2">
                          <button
                            onClick={() => {
                              setEditingProduct(prod);
                              setIsCreating(false);
                            }}
                            className="p-1.5 hover:text-gold-accent text-chocolate-deep transition-colors"
                            title="Editar"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="p-1.5 hover:text-berry-red text-coffee-muted transition-colors"
                            title="Excluir"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* FORMULÁRIO DE EDIÇÃO / CRIAÇÃO */}
            {editingProduct && (
              <div className="bg-white p-6 rounded-2xl border-2 border-gold-accent/40 shadow-md">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-tan-pale/30">
                  <h4 className="font-headline text-xl font-bold text-chocolate-deep">
                    {isCreating ? 'Adicionar Novo Item' : `Editando: ${editingProduct.name}`}
                  </h4>
                  <button 
                    onClick={() => setEditingProduct(null)} 
                    className="p-1 text-coffee-muted hover:text-chocolate-deep"
                  >
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleSaveProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-bold text-chocolate-deep uppercase">Nome do Produto</label>
                    <input 
                      type="text" 
                      value={editingProduct.name || ''} 
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} 
                      className="w-full p-2.5 bg-cream-soft rounded-lg border border-tan-pale/50 outline-none focus:ring-2 focus:ring-gold-accent"
                      required
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-bold text-chocolate-deep uppercase">Descrição Curta</label>
                    <textarea 
                      value={editingProduct.description || ''} 
                      onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} 
                      rows={2}
                      className="w-full p-2.5 bg-cream-soft rounded-lg border border-tan-pale/50 outline-none focus:ring-2 focus:ring-gold-accent"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-chocolate-deep uppercase">Preço (R$)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      value={editingProduct.price || 0} 
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })} 
                      className="w-full p-2.5 bg-cream-soft rounded-lg border border-tan-pale/50 outline-none focus:ring-2 focus:ring-gold-accent"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-chocolate-deep uppercase">Unidade de Cobrança</label>
                    <select
                      value={editingProduct.priceUnit || 'kg'}
                      onChange={(e) => setEditingProduct({ ...editingProduct, priceUnit: e.target.value as any })}
                      className="w-full p-2.5 bg-cream-soft rounded-lg border border-tan-pale/50 outline-none focus:ring-2 focus:ring-gold-accent"
                    >
                      <option value="kg">Por Kg (/kg)</option>
                      <option value="un">Por Unidade (/un)</option>
                      <option value="peça">Por Peça (/peça)</option>
                      <option value="cento">Por Cento (/cento)</option>
                    </select>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-bold text-chocolate-deep uppercase">
                      Caminho da Imagem (dist/public/assets/aistudio)
                    </label>
                    <input 
                      type="text" 
                      placeholder="/assets/aistudio/nome_da_foto.jpg"
                      value={editingProduct.image || ''} 
                      onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })} 
                      className="w-full p-2.5 bg-cream-soft rounded-lg border border-tan-pale/50 outline-none focus:ring-2 focus:ring-gold-accent font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2 flex justify-end gap-3 pt-4 border-t border-tan-pale/30">
                    <button
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="px-4 py-2 border border-tan-pale/50 rounded-xl text-coffee-muted font-bold uppercase tracking-wider"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-6 py-2 bg-chocolate-deep hover:bg-chocolate-roast text-white rounded-xl font-bold uppercase tracking-wider shadow"
                    >
                      <Save size={15} className="text-gold-accent" />
                      <span>Salvar Produto</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* COLUNA 3: CONFIGURAÇÕES COMPLEMENTARES & FERRAMENTAS */}
          <div className="space-y-6">

            {/* FERRAMENTA 1: TEXTOS DO WHATSAPP */}
            <div className="bg-white p-6 rounded-2xl border border-tan-pale/40 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-tan-pale/30">
                <MessageSquare size={18} className="text-gold-accent" />
                <h4 className="font-headline font-bold text-lg text-chocolate-deep">Mensagem do WhatsApp</h4>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-chocolate-deep uppercase">Saudação Inicial</label>
                <textarea 
                  rows={2}
                  value={whatsappTemplate.header}
                  onChange={(e) => setWhatsappTemplate({ ...whatsappTemplate, header: e.target.value })}
                  className="w-full p-2 bg-cream-soft rounded-lg border border-tan-pale/50 text-xs outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-chocolate-deep uppercase">Frase de Fechamento</label>
                <textarea 
                  rows={2}
                  value={whatsappTemplate.footer}
                  onChange={(e) => setWhatsappTemplate({ ...whatsappTemplate, footer: e.target.value })}
                  className="w-full p-2 bg-cream-soft rounded-lg border border-tan-pale/50 text-xs outline-none"
                />
              </div>

              <button
                onClick={handleSaveSettings}
                className="w-full py-2 bg-chocolate-deep hover:bg-chocolate-roast text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Atualizar Textos
              </button>
            </div>

            {/* FERRAMENTA 2: CARDÁPIO EM PDF */}
            <div className="bg-white p-6 rounded-2xl border border-tan-pale/40 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-tan-pale/30">
                <FileText size={18} className="text-gold-accent" />
                <h4 className="font-headline font-bold text-lg text-chocolate-deep">Cardápio em PDF</h4>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-chocolate-deep uppercase">URL do Arquivo PDF</label>
                <input 
                  type="text"
                  value={pdfMenuUrl}
                  onChange={(e) => setPdfMenuUrl(e.target.value)}
                  className="w-full p-2 bg-cream-soft rounded-lg border border-tan-pale/50 text-xs font-mono outline-none"
                />
                <p className="text-[10px] text-coffee-muted">
                  Cole o link gerado pelo Google Drive, Dropbox ou Firebase Storage para substituir o arquivo sem precisar recompilar o site.
                </p>
              </div>

              <button
                onClick={handleSaveSettings}
                className="w-full py-2 bg-chocolate-deep hover:bg-chocolate-roast text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Salvar Novo PDF
              </button>
            </div>

            {/* FERRAMENTA 3: MODO PAUSA / AVISO DE EXPEDIENTE EMERGENCIAL */}
            <div className="bg-white p-6 rounded-2xl border border-tan-pale/40 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-tan-pale/30">
                <Store size={18} className="text-gold-accent" />
                <h4 className="font-headline font-bold text-lg text-chocolate-deep">Status da Loja</h4>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-chocolate-deep">Loja Aberta para Pedidos</span>
                <input 
                  type="checkbox" 
                  checked={storeStatus.isOpen} 
                  onChange={(e) => setStoreStatus({ ...storeStatus, isOpen: e.target.checked })} 
                  className="w-5 h-5 accent-chocolate-deep cursor-pointer"
                />
              </div>

              {!storeStatus.isOpen && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-chocolate-deep uppercase">Mensagem de Fechamento</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Não estamos recebendo novos pedidos temporariamente."
                    value={storeStatus.message} 
                    onChange={(e) => setStoreStatus({ ...storeStatus, message: e.target.value })}
                    className="w-full p-2 bg-cream-soft rounded-lg border border-tan-pale/50 text-xs outline-none"
                  />
                </div>
              )}

              <button
                onClick={handleSaveSettings}
                className="w-full py-2 bg-chocolate-deep hover:bg-chocolate-roast text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Salvar Status
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};