export type Locale = 'pt' | 'en'

export type Dictionary = {
  brand: string
  tagline: string
  browse: string
  cart: string
  admin: string
  developed: string
  search: string
  all: string
  color: string
  size: string
  add: string
  added: string
  stock: string
  empty: string
  checkout: string
  email: string
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
  image: string
  sku: string
  price: string
  qty: string
  method: string
  status: string
  heroLead: string
  heroCopy: string
  shop: string
  out: string
  variant: string
}

export const dictionaries: Record<Locale, Dictionary> = {
  pt: {
    brand: 'FORJA',
    tagline: 'Peças com peso, cor de brasa',
    browse: 'Loja',
    cart: 'Carrinho',
    admin: 'Admin',
    developed: 'Developed by David Arsénio Martins',
    search: 'Busca por nome ou categoria',
    all: 'Tudo',
    color: 'Cor',
    size: 'Tamanho',
    add: 'Adicionar ao carrinho',
    added: 'No carrinho',
    stock: 'em stock',
    empty: 'O carrinho está vazio.',
    checkout: 'Checkout',
    email: 'E-mail',
    card: 'Cartão (Stripe)',
    pix: 'PIX',
    pay: 'Pagar',
    success: 'Encomenda confirmada',
    successBody: 'Enviámos o recibo para o e-mail da encomenda. O stock já foi descontado.',
    login: 'Entrar',
    password: 'Palavra-passe',
    products: 'Produtos',
    orders: 'Pedidos',
    stockCol: 'Stock',
    save: 'Guardar',
    logout: 'Sair',
    newProduct: 'Novo produto',
    name: 'Nome',
    nameEn: 'Nome EN',
    category: 'Categoria',
    image: 'Imagem',
    sku: 'SKU',
    price: 'Preço',
    qty: 'Qtd',
    method: 'Método',
    status: 'Estado',
    heroLead: 'Atelier nocturno',
    heroCopy:
      'Catálogo com filtros, variantes de cor e tamanho, carrinho persistente e checkout com cartão ou PIX.',
    shop: 'Ver catálogo',
    out: 'Esgotado',
    variant: 'Escolhe cor e tamanho',
  },
  en: {
    brand: 'FORJA',
    tagline: 'Heavy pieces, ember colour',
    browse: 'Shop',
    cart: 'Cart',
    admin: 'Admin',
    developed: 'Developed by David Arsénio Martins',
    search: 'Search by name or category',
    all: 'All',
    color: 'Colour',
    size: 'Size',
    add: 'Add to cart',
    added: 'In cart',
    stock: 'in stock',
    empty: 'The cart is empty.',
    checkout: 'Checkout',
    email: 'Email',
    card: 'Card (Stripe)',
    pix: 'PIX',
    pay: 'Pay',
    success: 'Order confirmed',
    successBody: 'A receipt was sent to the order email. Stock has already been deducted.',
    login: 'Sign in',
    password: 'Password',
    products: 'Products',
    orders: 'Orders',
    stockCol: 'Stock',
    save: 'Save',
    logout: 'Sign out',
    newProduct: 'New product',
    name: 'Name',
    nameEn: 'Name EN',
    category: 'Category',
    image: 'Image',
    sku: 'SKU',
    price: 'Price',
    qty: 'Qty',
    method: 'Method',
    status: 'Status',
    heroLead: 'Night atelier',
    heroCopy: 'Filtered catalogue, colour and size variants, a persistent cart, and checkout by card or PIX.',
    shop: 'See the catalogue',
    out: 'Sold out',
    variant: 'Pick colour and size',
  },
}
