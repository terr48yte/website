import { z } from "zod";

export const formPendaftaranSchema = z.object({
  nama: z.string().min(4),
  kelas: z
    .string()
    .regex(
      new RegExp("^(X[1-8]|XI[1-8])$"),
      "Kelas harus diisi dengan nilai yang valid ex: X6 XI5"
    ),
  whatsapp: z
    .string()
    .regex(new RegExp("^08[1-9][0-9]{6,9}$"), "Nomor telepon tidak valid"),
  alasan: z.string(),
});

export type FormPendaftaranSchema = z.infer<typeof formPendaftaranSchema>;

export type khodamProps = {
  user: string;
  nama: string;
  deskripsi: string;
  image_url: string;
};

export const formKhodamSchema = z.object({
  nama: z.string().min(4),
});

export type FormKhodamSchema = z.infer<typeof formKhodamSchema>;
