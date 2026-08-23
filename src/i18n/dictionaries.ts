export type Locale = 'pt' | 'en'

export type Dictionary = {
  brand: string
  tagline: string
  browse: string
  collections: string
  atelier: string
  cart: string
  admin: string
  developed: string
  search: string
  all: string
  finish: string
  format: string
  add: string
  added: string
  stock: string
  empty: string
  checkout: string
  email: string
  fullName: string
  address: string
  city: string
  postal: string
  card: string
  pix: string
  pay: string
  success: string
  successBody: string
  login: string
  password: string
  products: string
  orders: string
  stockCol: string
  save: string
  logout: string
  newProduct: string
  name: string
  nameEn: string
  category: string
  sku: string
  price: string
  heroLead: string
  heroCopy: string
  shop: string
  out: string
  variant: string
  continue: string
  shipping: string
  payment: string
  related: string
  edition: string
  labCopy: string
}

export const dictionaries: Record<Locale, Dictionary> = {
  pt: {
    brand: 'FORJA',
    tagline: 'Laboratório e material fotográfico, Cascais',
    browse: 'Catálogo',
    collections: 'Colecções',
    atelier: 'O laboratório',
    cart: 'Carrinho',
    admin: 'Admin',
    developed: 'Developed by David Arsénio Martins',
    search: 'Canon, Nikon, Fujifilm, 70-200…',
    all: 'Tudo',
    finish: 'Acabamento',
    format: 'Formato',
    add: 'Adicionar ao carrinho',
    added: 'No carrinho',
    stock: 'em stock',
    empty: 'O carrinho está vazio.',
    checkout: 'Checkout',
    email: 'E-mail',
    fullName: 'Nome completo',
    address: 'Morada',
    city: 'Cidade',
    postal: 'Código postal',
    card: 'Cartão (Stripe)',
    pix: 'PIX',
    pay: 'Pagar',
    success: 'Encomenda confirmada',
    successBody: 'O laboratório recebeu o pedido. O recibo segue para o e-mail e o stock já foi descontado.',
    login: 'Entrar',
    password: 'Palavra-passe',
    products: 'Produtos',
    orders: 'Pedidos',
    stockCol: 'Stock',
    save: 'Guardar',
    logout: 'Sair',
    newProduct: 'Novo artigo',
    name: 'Nome',
    nameEn: 'Nome EN',
    category: 'Colecção',
    sku: 'SKU',
    price: 'Preço (cêntimos)',
    heroLead: 'Desde 16 anos de rua',
    heroCopy:
      'Material de fotojornalismo, rua e desporto. Canon, Nikon, Fujifilm, Leica e Sigma: corpos, teleobjectivas, película e provas. Stock, variantes e checkout a sério.',
    shop: 'Abrir o catálogo',
    out: 'Esgotado',
    variant: 'Acabamento e formato',
    continue: 'Seguir para checkout',
    shipping: 'Envio',
    payment: 'Pagamento',
    related: 'Na mesma colecção',
    edition: 'Edição',
    labCopy:
      'A FORJA é um laboratório pequeno em Cascais: bancada de revelação, arquivo de negativos e uma prateleira de material escolhido à mão. Cada corpo passa pela revisão. Cada prova sai com margem e lápis.',
  },
  en: {
    brand: 'FORJA',
    tagline: 'Photographic lab and supply, Cascais',
    browse: 'Catalogue',
    collections: 'Collections',
    atelier: 'The lab',
    cart: 'Cart',
    admin: 'Admin',
    developed: 'Developed by David Arsénio Martins',
    search: 'Canon, Nikon, Fujifilm, 70-200…',
    all: 'All',
    finish: 'Finish',
    format: 'Format',
    add: 'Add to cart',
    added: 'In cart',
    stock: 'in stock',
    empty: 'The cart is empty.',
    checkout: 'Checkout',
    email: 'Email',
    fullName: 'Full name',
    address: 'Address',
    city: 'City',
    postal: 'Postal code',
    card: 'Card (Stripe)',
    pix: 'PIX',
    pay: 'Pay',
    success: 'Order confirmed',
    successBody: 'The lab has the order. A receipt goes to the email and stock has already been deducted.',
    login: 'Sign in',
    password: 'Password',
    products: 'Products',
    orders: 'Orders',
    stockCol: 'Stock',
    save: 'Save',
    logout: 'Sign out',
    newProduct: 'New item',
    name: 'Name',
    nameEn: 'Name EN',
    category: 'Collection',
    sku: 'SKU',
    price: 'Price (cents)',
    heroLead: 'From 16 years on the street',
    heroCopy:
      'Gear for photojournalism, street and sport. Canon, Nikon, Fujifilm, Leica and Sigma: bodies, telephotos, film and prints. Stock, variants and a serious checkout.',
    shop: 'Open the catalogue',
    out: 'Sold out',
    variant: 'Finish and format',
    continue: 'Continue to checkout',
    shipping: 'Shipping',
    payment: 'Payment',
    related: 'In the same collection',
    edition: 'Edition',
    labCopy:
      'FORJA is a small lab in Cascais: a developing bench, a negative archive and a shelf of material chosen by hand. Every body is serviced. Every print leaves with a margin and a pencil.',
  },
}
