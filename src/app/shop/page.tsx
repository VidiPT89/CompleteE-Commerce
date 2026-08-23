import { ShopDesk } from '@/components/ShopDesk'

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ collection?: string }>
}) {
  const { collection } = await searchParams
  return <ShopDesk initialCollection={collection ?? ''} />
}
