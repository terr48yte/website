import { FormCheckKhodam } from "@/components/form-check-khodam";
import { H1, H3 } from "@/components/typography";

export default function CekKhodam() {
  return (
    <div className="space-y-8">
      <div>
        <H1 text="TERRKHODAM" />
        <H3 text="Cek khodam kamu" />
      </div>
      <FormCheckKhodam />
    </div>
  );
}
