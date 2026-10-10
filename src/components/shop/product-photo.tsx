import { productImageSrc } from "@/lib/shop/skin-kits";

export function ProductPhoto({ id, className }: { id: string; className?: string }) {
  return <img src={productImageSrc(id)} alt="" className={className} />;
}
