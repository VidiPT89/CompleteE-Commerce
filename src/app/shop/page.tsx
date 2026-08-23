import { ShopDesk } from '@/components/shop/ShopDesk'

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ collection?: string }>
}) {
  const { collection } = await searchParams
  return <ShopDesk initialCollection={collection ?? ''} />
}
