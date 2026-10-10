import { SkinWall } from "@/components/shop/skin-wall";
import { SpaceFooter } from "@/components/shop/space-footer";
import { SAMPLE_NOTE } from "@/lib/shop/skin-kits";

export default function PielPage() {
  return (
    <div className="bg-white py-10">
      <SkinWall />
      <p className="mx-auto mt-6 max-w-[1160px] px-5 text-center text-[13px] leading-relaxed text-[#64675f]">{SAMPLE_NOTE}</p>
      <SpaceFooter />
    </div>
  );
}
