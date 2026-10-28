import { Product, Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'bolos-finos',
    name: 'Bolos Finos',
    description: 'Nossa coleção completa de bolos artesanais, desde os intensos de chocolate até os refrescantes tropicais.',
    image: '/assets/aistudio/foto_bolo_sweets_and_cakes_3ea7270b.jpg',
    itemCount: 'Mais de 20 variedades'
  },
  {
    id: 'cheesecakes-tortas-especiais',
    name: 'Cheesecakes & Tortas',
    description: 'Cheesecake Frutas Vermelhas, Torta Banoffee caramelizada e Torta Alfajor.',
    image: '/assets/aistudio/foto_cheesecake_frutas_vermelhas_e0390015.jpg',
    itemCount: 'Ver tortas'
  },
  {
    id: 'docinhos-salgados-guia-de-festas',
    name: 'Docinhos & Salgados Finos',
    description: 'Coxinhas douradas, empadas finas, folhados e cento de brigadeiros artesanais.',
    image: '/assets/aistudio/salgados_b13f6069.jpg',
    itemCount: 'Guia completo'
  }
];

export const PRODUCTS: Product[] = [
  // ==========================================
  // DESTAQUES DA COLEÇÃO (Bolos Finos)
  // ==========================================
  {
    id: 'ninho-morango-showcase',
    name: 'Ninho com Morango',
    description: 'Creme de leite em pó, morangos frescos selecionados e raspas de chocolate branco.',
    price: 137.00,
    priceUnit: 'kg',
    categories: ['morangos', 'especiais', 'bolos-finos'],
    tags: ['O Mais Pedido'],
    image: '/assets/aistudio/foto_bolo_ninho_com_morango_f0729b17.jpg',
    highlight: true
  },
  {
    id: 'sweets-and-cakes-assinatura-showcase',
    name: 'Sweets and Cakes (Assinatura)',
    description: 'Pão de ló, creme de baunilha, frutas frescas, chantilly e calda de maracujá.',
    price: 127.70,
    priceUnit: 'kg',
    categories: ['especiais', 'bolos-finos'],
    tags: ['Assinatura da Casa'],
    image: '/assets/aistudio/foto_bolo_sweets_and_cakes_3ea7270b.jpg',
    highlight: true
  },
  {
    id: 'tradicional-brigadeiro-showcase',
    name: 'Tradicional de Brigadeiro',
    description: 'Pão de ló de chocolate 50%, recheio farto de brigadeiro artesanal e raspas de chocolate.',
    price: 127.00,
    priceUnit: 'kg',
    categories: ['chocolate', 'bolos-finos'],
    tags: ['O Mais Pedido'],
    image: '/assets/aistudio/bolo_brigadeiro.jpg',
    highlight: true
  },

  // ==========================================
  // DESTAQUES DA COLEÇÃO (Tortas & Cheesecakes)
  // ==========================================
  {
    id: 'cheesecake-frutas-vermelhas-showcase',
    name: 'Cheesecake Frutas Vermelhas',
    description: 'Base crocante amanteigada de biscoitos finos e creme sedoso de autêntico cream cheese com calda artesanal.',
    price: 98.00,
    priceUnit: 'kg',
    categories: ['tortas', 'cheesecakes-tortas-especiais'],
    tags: ['Especialidade'],
    image: '/assets/aistudio/foto_cheesecake_frutas_vermelhas_e0390015.jpg',
    highlight: true
  },
  {
    id: 'torta-banoffee-showcase',
    name: 'Torta Banoffee Tradicional',
    description: 'Biscoito triturado, farto doce de leite, banana in natura, chantilly leve e cacau em pó.',
    price: 107.00,
    priceUnit: 'kg',
    categories: ['tortas', 'cheesecakes-tortas-especiais'],
    tags: ['Mais Vendida'],
    image: '/assets/aistudio/foto_bolo_torta_banaffe_8557cb8c.jpg',
    highlight: true
  },
  {
    id: 'torta-negra-diablo-showcase',
    name: 'Torta Negra del Diablo',
    description: 'Massa com cacau 100%, recheio generoso de doce de leite, calda de chocolate e cacau em pó.',
    price: 147.00,
    priceUnit: 'kg',
    categories: ['tortas', 'cheesecakes-tortas-especiais'],
    tags: ['Intensa'],
    image: '/assets/aistudio/foto_bolo_torta_negra_del_diablo_d5ad957f.jpg',
    highlight: true
  },

  // ==========================================
  // CATÁLOGO GERAL: BOLOS FINOS (Chocolate & Especiais)
  // ==========================================
  {
    id: 'prestigio',
    name: 'Prestígio',
    description: 'Pão de ló de cacau, creme de coco fresco, chantilly e raspas de chocolate.',
    price: 117.70,
    priceUnit: 'kg',
    categories: ['chocolate', 'bolos-finos'],
    tags: ['Clássico'],
    image: '/assets/aistudio/Bolo_prestigio.jpeg'
  },
  {
    id: 'tradicional-brigadeiro',
    name: 'Tradicional de Brigadeiro',
    description: 'Pão de ló de chocolate 50%, recheio farto de brigadeiro artesanal e raspas de chocolate.',
    price: 127.00,
    priceUnit: 'kg',
    categories: ['chocolate', 'bolos-finos'],
    tags: ['Mais Vendido'],
    image: '/assets/aistudio/bolo_brigadeiro.jpg'
  },
  {
    id: 'frutas-vermelhas',
    name: 'Frutas Vermelhas',
    description: 'Creme de baunilha, geleia de frutas vermelhas frescas, chantilly e merengue.',
    price: 117.70,
    priceUnit: 'kg',
    categories: ['morangos', 'especiais', 'bolos-finos'],
    tags: ['Especial'],
    image: '/assets/aistudio/foto_bolo_frutas_vermelhas_c4ae7594.jpg'
  },
  {
    id: 'red-velvet',
    name: 'Red Velvet',
    description: 'Massa veludo vermelho, cream cheese frosting genuíno e geleia de frutas vermelhas.',
    price: 117.70,
    priceUnit: 'kg',
    categories: ['especiais', 'bolos-finos'],
    tags: ['Sofisticado'],
    image: '/assets/aistudio/foto_bolo_red_velvet_554a432f.jpg'
  },
  {
    id: 'dois-amores',
    name: 'Dois Amores (Ninho & Brigadeiro)',
    description: 'Creme de leite em pó Ninho, brigadeiro de panela e raspas bicolores de chocolate.',
    price: 137.00,
    priceUnit: 'kg',
    categories: ['chocolate', 'especiais', 'bolos-finos'],
    tags: ['Duplo Sabor'],
    image: '/assets/aistudio/foto_ninho_e_brigadeiro_1a1e33f9.jpg'
  },
  {
    id: 'ninho-morango',
    name: 'Ninho com Morango',
    description: 'Creme de leite em pó, morangos frescos selecionados e raspas de chocolate branco.',
    price: 137.00,
    priceUnit: 'kg',
    categories: ['morangos', 'especiais', 'bolos-finos'],
    tags: ['Favorito'],
    image: '/assets/aistudio/foto_bolo_ninho_com_morango_f0729b17.jpg'
  },
  {
    id: 'brigadeiro-morango',
    name: 'Brigadeiro com Morango',
    description: 'Creme de brigadeiro de panela, morangos in natura picados e raspas de chocolate.',
    price: 137.00,
    priceUnit: 'kg',
    categories: ['chocolate', 'morangos', 'bolos-finos'],
    tags: ['Irresistível'],
    image: '/assets/aistudio/foto_bolo_brigadeiro_com_Morango_07289555.jpg'
  },
  {
    id: 'coco-morango',
    name: 'Coco com Morango',
    description: 'Creme aveludado de coco fresco e morangos in natura em massa branca amanteigada.',
    price: 137.00,
    priceUnit: 'kg',
    categories: ['morangos', 'especiais', 'bolos-finos'],
    tags: ['Harmonia'],
    image: '/assets/aistudio/foto_bolo_Coco_com_Morango_9abc2a86.jpg'
  },
  {
    id: 'da-vovo',
    name: 'Da Vovó',
    description: 'Massas branca e cacau, creme de ameixa preta, doce de leite e nozes chilenas.',
    price: 137.00,
    priceUnit: 'kg',
    categories: ['especiais', 'chocolate', 'bolos-finos'],
    tags: ['Nostalgia'],
    image: '/assets/aistudio/foto_bolo_da_vovo_0d879db2.jpg'
  },
  {
    id: 'nozes',
    name: 'Nozes',
    description: 'Pão de ló fino de nozes com creme de leite condensado cremoso e nozes picadas.',
    price: 147.00,
    priceUnit: 'kg',
    categories: ['especiais', 'bolos-finos'],
    tags: ['Nobre'],
    image: '/assets/aistudio/foto_bolo_de_nozes_1a930627.jpg'
  },
  {
    id: 'crock-brownie',
    name: 'Crock Brownie',
    description: 'Brownie meio amargo artesanal com textura densa, casquinha crocante e sabor intenso de chocolate.',
    price: 117.00,
    priceUnit: 'kg',
    categories: ['chocolate', 'especiais', 'bolos-finos'],
    tags: ['Especial da Casa'],
    image: '/assets/aistudio/Bolo_crock_brownie.jpg'
  },
  {
    id: 'milk-brownie',
    name: 'Milk Brownie',
    description: 'Massa cremosa de brownie com cobertura generosa e suave de calda de leite Ninho.',
    price: 117.00,
    priceUnit: 'kg',
    categories: ['chocolate', 'especiais', 'bolos-finos'],
    tags: ['Receita da Casa'],
    image: '/assets/aistudio/foto_bolo_milk_brownie.jpg'
  },
  {
    id: 'trufado-amendoim',
    name: 'Bolo Trufado de Amendoim',
    description: 'Recheio trufado especial com amendoim crocante selecionado e chocolate meio amargo.',
    price: 117.00,
    priceUnit: 'kg',
    categories: ['chocolate', 'especiais', 'bolos-finos'],
    tags: ['Crocante'],
    image: '/assets/aistudio/Bolo_trufado_amendoim.jpg'
  },
  {
    id: 'cenoura-brigadeiro',
    name: 'Cenoura com Brigadeiro',
    description: 'Massa caseira de cenoura com farto recheio e cobertura de brigadeiro artesanal.',
    price: 107.70,
    priceUnit: 'kg',
    categories: ['chocolate', 'bolos-finos'],
    tags: ['Caseiro'],
    image: '/assets/aistudio/foto_bolo_cenoura_e_brigadeiro_5086d589.jpg'
  },
  {
    id: 'do-chefe',
    name: 'Do Chefe',
    description: 'Pão de ló branco leve, recheado com creme nobre de baunilha e açúcar impalpável.',
    price: 117.00,
    priceUnit: 'kg',
    categories: ['especiais', 'bolos-finos'],
    tags: ['Assinatura'],
    image: '/assets/aistudio/foto_bolo_do_chefe_32db8dad.jpg'
  },

  // ==========================================
  // CATÁLOGO GERAL: BOLOS FINOS (Tradicionais & Tropicais)
  // ==========================================
  {
    id: 'coco-tradicional',
    name: 'Coco Tradicional',
    description: 'Pão de ló branco, creme de coco fresco, chantilly e coco ralado fresco in natura.',
    price: 117.70,
    priceUnit: 'kg',
    categories: ['tradicionais', 'tropicais', 'bolos-finos'],
    tags: ['Fresco'],
    image: '/assets/aistudio/foto_bolo_coco_tradicional_cb906963.jpg'
  },
  {
    id: 'coco-doce-leite',
    name: 'Coco com Doce de Leite',
    description: 'Pão de ló branco, creme de coco fresco e doce de leite artesanal cremoso.',
    price: 117.70,
    priceUnit: 'kg',
    categories: ['tradicionais', 'bolos-finos'],
    tags: ['Artesanal'],
    image: '/assets/aistudio/foto_bolo_de_coco_3d124cfe.jpg'
  },
  {
    id: 'coco-abacaxi',
    name: 'Coco e Abacaxi',
    description: 'Pão de ló branco, creme de coco, geleia de abacaxi, chantilly e lascas de coco fresco.',
    price: 117.70,
    priceUnit: 'kg',
    categories: ['tradicionais', 'tropicais', 'bolos-finos'],
    tags: ['Tropical'],
    image: '/assets/aistudio/foto_bolo_coco_abacaxi_ca23133b.jpg'
  },
  {
    id: 'bem-casado',
    name: 'Bem-Casado',
    description: 'Pão de ló branco, doce de leite artesanal cozido, chantilly e flocos de coco.',
    price: 117.70,
    priceUnit: 'kg',
    categories: ['tradicionais', 'bolos-finos'],
    tags: ['Festivo'],
    image: '/assets/aistudio/foto_bolo_bem_casado_2c1515bd.jpg'
  },
  {
    id: 'abacaxi',
    name: 'Abacaxi',
    description: 'Pão de ló branco, creme especial de confeiteiro, geleia de abacaxi e chantilly.',
    price: 117.00,
    priceUnit: 'kg',
    categories: ['tradicionais', 'tropicais', 'bolos-finos'],
    tags: ['Frutado'],
    image: '/assets/aistudio/foto_bolo_de_abacaxi_444f066c.jpg'
  },
  {
    id: 'ninho-abacaxi',
    name: 'Ninho com Abacaxi',
    description: 'Pão de ló branco, creme Ninho, geleia de abacaxi e raspas de chocolate branco.',
    price: 117.70,
    priceUnit: 'kg',
    categories: ['tradicionais', 'tropicais', 'bolos-finos'],
    tags: ['Refrescante'],
    image: '/assets/aistudio/foto_bolo_ninho_abacaxi_16007329.jpg'
  },
  {
    id: 'mousse-maracuja',
    name: 'Mousse de Maracujá',
    description: 'Pão de ló branco, coberto e recheado com mousse aerada de maracujá fresco.',
    price: 117.70,
    priceUnit: 'kg',
    categories: ['tradicionais', 'tropicais', 'bolos-finos'],
    tags: ['Cítrico'],
    image: '/assets/aistudio/foto_bolo_mousse_maracuja_d0f645cf.jpg'
  },
  {
    id: 'mousse-limao',
    name: 'Mousse de Limão',
    description: 'Pão de ló recheado com mousse de limão, chantilly leve e merengue tostado.',
    price: 117.70,
    priceUnit: 'kg',
    categories: ['tradicionais', 'tropicais', 'bolos-finos'],
    tags: ['Equilibrado'],
    image: '/assets/aistudio/foto_bolo_mousse_de_lim_o_75de7bf0.jpg'
  },

  // ==========================================
  // CATÁLOGO GERAL: CHEESECAKES & TORTAS
  // ==========================================
  {
    id: 'cheesecake-frutas-vermelhas',
    name: 'Cheesecake Frutas Vermelhas',
    description: 'Base crocante amanteigada e creme sedoso de autêntico cream cheese com calda de frutas vermelhas.',
    price: 98.00,
    priceUnit: 'kg',
    categories: ['tortas', 'cheesecakes-tortas-especiais'],
    tags: ['Especialidade'],
    image: '/assets/aistudio/foto_cheesecake_frutas_vermelhas_e0390015.jpg'
  },
  {
    id: 'cheesecake-limao-siciliano',
    name: 'Cheesecake Limão Siciliano',
    description: 'Base crocante amanteigada e creme sedoso de autêntico cream cheese com toque de limão siciliano.',
    price: 98.00,
    priceUnit: 'kg',
    categories: ['tortas', 'cheesecakes-tortas-especiais'],
    tags: ['Aromático'],
    image: '/assets/aistudio/foto_cheesecake_lim_o_f1998556.jpg'
  },
  {
    id: 'cheesecake-damasco',
    name: 'Cheesecake Damasco Turco',
    description: 'Base crocante amanteigada e creme sedoso de autêntico cream cheese com calda de damasco turco.',
    price: 98.00,
    priceUnit: 'kg',
    categories: ['tortas', 'cheesecakes-tortas-especiais'],
    tags: ['Importado'],
    image: '/assets/aistudio/foto_torta_cheesecake_damasco_cda30ed2.jpg'
  },
  {
    id: 'cheesecake-goiabada',
    name: 'Cheesecake Goiabada Cascão',
    description: 'Base crocante amanteigada e creme sedoso de autêntico cream cheese com goiabada cascão.',
    price: 98.00,
    priceUnit: 'kg',
    categories: ['tortas', 'cheesecakes-tortas-especiais'],
    tags: ['Brasileiríssimo'],
    image: '/assets/aistudio/foto_bolo_cheesecake_goiaba_86b15fc6.jpg'
  },
  {
    id: 'cheesecake-maracuja',
    name: 'Cheesecake Maracujá',
    description: 'Base crocante amanteigada e creme sedoso de autêntico cream cheese com calda de maracujá.',
    price: 98.00,
    priceUnit: 'kg',
    categories: ['tortas', 'cheesecakes-tortas-especiais'],
    tags: ['Agridoce'],
    image: '/assets/aistudio/foto_cheesecake_maracuja_6b6ccc76.jpg'
  },
  {
    id: 'torta-banoffee',
    name: 'Torta Banoffee',
    description: 'Biscoito triturado, farto doce de leite, banana in natura, chantilly leve e cacau em pó.',
    price: 107.00,
    priceUnit: 'kg',
    categories: ['tortas', 'cheesecakes-tortas-especiais'],
    tags: ['Mais Vendida'],
    image: '/assets/aistudio/foto_bolo_torta_banaffe_8557cb8c.jpg'
  },
  {
    id: 'torta-alfajor-especial',
    name: 'Torta Alfajor Especial',
    description: 'Discos crocantes, doce de leite artesanal, marshmallow tostado e raspas de chocolate.',
    price: 147.00,
    priceUnit: 'kg',
    categories: ['tortas', 'cheesecakes-tortas-especiais'],
    tags: ['Autoral'],
    image: '/assets/aistudio/foto_bolo_torta_alfajor_938e6862.jpg'
  },
  {
    id: 'torta-trufada-rum',
    name: 'Torta Trufada ao Rum',
    description: 'Creme trufado aveludado com rum nobre e cacau em base crocante de chocolate.',
    price: 127.00,
    priceUnit: 'kg',
    categories: ['tortas', 'cheesecakes-tortas-especiais'],
    tags: ['Intensa'],
    image: '/assets/aistudio/foto_bolo_trufa_e55f2729.jpg'
  },
  {
    id: 'torta-negra-diablo',
    name: 'Torta Negra del Diablo',
    description: 'Massa com cacau 100%, recheio generoso de doce de leite, calda de chocolate e cacau em pó.',
    price: 147.00,
    priceUnit: 'kg',
    categories: ['tortas', 'cheesecakes-tortas-especiais'],
    tags: ['Chocolate Puro'],
    image: '/assets/aistudio/foto_bolo_torta_negra_del_diablo_d5ad957f.jpg'
  },
  {
    id: 'torta-ganache',
    name: 'Torta Ganache',
    description: 'Massa sablée crocante, ganache pura de chocolate meio amargo e brilho acetinado.',
    price: 112.00,
    priceUnit: 'peça',
    categories: ['tortas', 'cheesecakes-tortas-especiais'],
    tags: ['Chocolatudo'],
    image: '/assets/aistudio/foto_bolo_torta_ganache_58489684.jpg'
  },
  {
    id: 'torta-limao-merengada',
    name: 'Torta de Limão Merengada',
    description: 'Massa crocante, curd cremoso de limão tahiti fresco e merengue dourado ao maçarico.',
    price: 97.70,
    priceUnit: 'peça',
    categories: ['tortas', 'cheesecakes-tortas-especiais'],
    tags: ['Clássico'],
    image: '/assets/aistudio/foto_bolo_torta_de_lim_o_e907b90d.jpg'
  },

  // ==========================================
  // CATÁLOGO GERAL: DOCINHOS GOURMET
  // ==========================================
  {
    id: 'brigadeiro-tradicional',
    name: 'Brigadeiro Tradicional',
    description: 'Cacau nobre 50% e granulado artesanal com receita autêntica da confeitaria.',
    price: 1.50,
    priceUnit: 'un',
    categories: ['docinhos', 'docinhos-salgados-guia-de-festas'],
    tags: ['Festa'],
    image: '/assets/aistudio/foto_brigadeiro_457e9863.jpg'
  },
  {
    id: 'beijinho-tradicional',
    name: 'Beijinho Tradicional',
    description: 'Coco ralado fresco e leite condensado cremoso enrolado delicadamente.',
    price: 1.50,
    priceUnit: 'un',
    categories: ['docinhos', 'docinhos-salgados-guia-de-festas'],
    tags: ['Festa'],
    image: '/assets/aistudio/foto_brigadeiro_457e9863.jpg'
  },
  {
    id: 'bicho-de-pe',
    name: 'Bicho de Pé (Moranguinho)',
    description: 'Clássico doce de morango cremoso com açúcar cristal fino.',
    price: 1.55,
    priceUnit: 'un',
    categories: ['docinhos', 'docinhos-salgados-guia-de-festas'],
    tags: ['Infantil'],
    image: '/assets/aistudio/foto_brigadeiro_457e9863.jpg'
  },
  {
    id: 'brigadeiro-churros',
    name: 'Brigadeiro de Churros',
    description: 'Doce de leite cozido com toque de canela e crosta de açúcar refinado.',
    price: 1.55,
    priceUnit: 'un',
    categories: ['docinhos', 'docinhos-salgados-guia-de-festas'],
    tags: ['Gourmet'],
    image: '/assets/aistudio/foto_brigadeiro_457e9863.jpg'
  },
  {
    id: 'beijinho-brulee',
    name: 'Beijinho Brûlée Maçaricado',
    description: 'Beijinho aveludado com casquinha crocante de açúcar maçaricado na hora.',
    price: 1.55,
    priceUnit: 'un',
    categories: ['docinhos', 'docinhos-salgados-guia-de-festas'],
    tags: ['Especial'],
    image: '/assets/aistudio/foto_brigadeiro_457e9863.jpg'
  },
  {
    id: 'mini-trufa-chocolate',
    name: 'Mini Trufa de Chocolate',
    description: 'Chocolate nobre com recheio cremoso e acabamento aveludado.',
    price: 1.55,
    priceUnit: 'un',
    categories: ['docinhos', 'docinhos-salgados-guia-de-festas'],
    tags: ['Fino'],
    image: '/assets/aistudio/foto_brigadeiro_457e9863.jpg'
  },
  {
    id: 'chocolate-branco-nobre',
    name: 'Chocolate Branco Nobre',
    description: 'Docinho enrolado de puro chocolate branco selecionado.',
    price: 1.75,
    priceUnit: 'un',
    categories: ['docinhos', 'docinhos-salgados-guia-de-festas'],
    tags: ['Premium'],
    image: '/assets/aistudio/foto_brigadeiro_457e9863.jpg'
  },
  {
    id: 'uva-brigadeiro-branco',
    name: 'Uva com Brigadeiro Branco',
    description: 'Uva verde fresca e crocante envolta em camada suave de brigadeiro branco.',
    price: 2.45,
    priceUnit: 'un',
    categories: ['docinhos', 'docinhos-salgados-guia-de-festas'],
    tags: ['Gourmet'],
    image: '/assets/aistudio/foto_brigadeiro_457e9863.jpg'
  },
  {
    id: 'trufa-cereja-especial',
    name: 'Trufa de Cereja Especial',
    description: 'Cereja marrasquino inteira banhada em ganache e casca de chocolate fino.',
    price: 3.60,
    priceUnit: 'un',
    categories: ['docinhos', 'docinhos-salgados-guia-de-festas'],
    tags: ['Fino'],
    image: '/assets/aistudio/foto_brigadeiro_457e9863.jpg'
  },
  {
    id: 'mini-tortinhas-variadas',
    name: 'Mini Tortinhas Variadas',
    description: 'Sortimento refinado de mini tortinhas crocantes de limão, morango e chocolate.',
    price: 6.00,
    priceUnit: 'un',
    categories: ['docinhos', 'docinhos-salgados-guia-de-festas'],
    tags: ['Mesa de Doces'],
    image: '/assets/aistudio/foto_brigadeiro_457e9863.jpg'
  },

  // ==========================================
  // CATÁLOGO GERAL: SALGADOS FINOS
  // ==========================================
  {
    id: 'bolinha-queijo',
    name: 'Bolinha de Queijo',
    description: 'Massa artesanal dourada e crocante recheada com queijo derretido.',
    price: 1.45,
    priceUnit: 'un',
    categories: ['salgados', 'docinhos-salgados-guia-de-festas'],
    tags: ['Mais Pedido'],
    image: '/assets/aistudio/salgados_b13f6069.jpg'
  },
  {
    id: 'mini-esfiha',
    name: 'Mini Esfiha (Carne ou Frango)',
    description: 'Esfiha macia com recheio farto e tempero especial da casa.',
    price: 1.50,
    priceUnit: 'un',
    categories: ['salgados', 'docinhos-salgados-guia-de-festas'],
    tags: ['Festa'],
    image: '/assets/aistudio/salgados_b13f6069.jpg'
  },
  {
    id: 'enroladinho-presunto',
    name: 'Enroladinho Presunto e Queijo',
    description: 'Clássico enroladinho folhado de presunto e queijo com casquinha crocante.',
    price: 1.50,
    priceUnit: 'un',
    categories: ['salgados', 'docinhos-salgados-guia-de-festas'],
    tags: ['Festa'],
    image: '/assets/aistudio/salgados_b13f6069.jpg'
  },
  {
    id: 'coxinha-frango',
    name: 'Coxinha de Frango Cremosa',
    description: 'Peito desfiado temperado com ervas finas e toque suave de requeijão.',
    price: 1.65,
    priceUnit: 'un',
    categories: ['salgados', 'docinhos-salgados-guia-de-festas'],
    tags: ['Favorito'],
    image: '/assets/aistudio/salgados_b13f6069.jpg'
  },
  {
    id: 'rissole-presunto',
    name: 'Rissole Presunto e Queijo',
    description: 'Rissole empanado em farinha especial, sequinho, crocante e bem recheado.',
    price: 1.65,
    priceUnit: 'un',
    categories: ['salgados', 'docinhos-salgados-guia-de-festas'],
    tags: ['Clássico'],
    image: '/assets/aistudio/salgados_b13f6069.jpg'
  },
  {
    id: 'empadinha',
    name: 'Empadinha (Palmito ou Frango)',
    description: 'Massa podre artesanal que derrete na boca com recheio cremoso e aromático.',
    price: 1.65,
    priceUnit: 'un',
    categories: ['salgados', 'docinhos-salgados-guia-de-festas'],
    tags: ['Fino'],
    image: '/assets/aistudio/salgados_b13f6069.jpg'
  },
  {
    id: 'mini-empanada-artesanal',
    name: 'Mini Empanada Artesanal',
    description: 'Empanada rústica assada com bordas trançadas e temperos frescos.',
    price: 1.65,
    priceUnit: 'un',
    categories: ['salgados', 'docinhos-salgados-guia-de-festas'],
    tags: ['Artesanal'],
    image: '/assets/aistudio/salgados_b13f6069.jpg'
  },
  {
    id: 'mini-quiche',
    name: 'Mini Quiche (Alho-Poró/Bacon)',
    description: 'Quiche fina com base amanteigada crocante e recheio leve e aveludado.',
    price: 1.70,
    priceUnit: 'un',
    categories: ['salgados', 'docinhos-salgados-guia-de-festas'],
    tags: ['Gourmet'],
    image: '/assets/aistudio/salgados_b13f6069.jpg'
  },
  {
    id: 'coxinha-calabresa',
    name: 'Coxinha de Calabresa',
    description: 'Coxinha com recheio defumado de calabresa moída bem temperada e dourada.',
    price: 2.00,
    priceUnit: 'un',
    categories: ['salgados', 'docinhos-salgados-guia-de-festas'],
    tags: ['Especial'],
    image: '/assets/aistudio/salgados_b13f6069.jpg'
  },
  {
    id: 'croquete-carne',
    name: 'Croquete Especial de Carne',
    description: 'Croquete cremoso de carne bovina nobre desfiada com temperos caseiros.',
    price: 2.05,
    priceUnit: 'un',
    categories: ['salgados', 'docinhos-salgados-guia-de-festas'],
    tags: ['Tradicional'],
    image: '/assets/aistudio/salgados_b13f6069.jpg'
  },
  {
    id: 'mini-pao-queijo',
    name: 'Mini Pão de Queijo Mineiro',
    description: 'Autêntico pão de queijo preparado com polvilho artesanal e queijo da Canastra.',
    price: 2.05,
    priceUnit: 'un',
    categories: ['salgados', 'docinhos-salgados-guia-de-festas'],
    tags: ['Forno'],
    image: '/assets/aistudio/salgados_b13f6069.jpg'
  }
];