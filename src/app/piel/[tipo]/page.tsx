import { notFound } from "next/navigation";

import { KitShelf } from "@/components/shop/kit-shelf";
import { SpaceFooter } from "@/components/shop/space-footer";
import { findSkinKit } from "@/lib/shop/skin-kits";

export default async function SkinKitPage({ params }: { params: Promise<{ tipo: string }> }) {
  const { tipo } = await params;
  const kit = findSkinKit(tipo);
  if (!kit) notFound();
  return (
    <>
      <KitShelf kit={kit} />
      <SpaceFooter />
    </>
  );
}
