import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Bersihkan data lama supaya seed bisa dijalankan berulang kali
  await prisma.ulasan.deleteMany();
  await prisma.fasilitas.deleteMany();
  await prisma.destinasi.deleteMany();

  const destinations = [
    {
      nama: 'Pantai Kuta Mandalika',
      kategori: 'Pantai',
      hargaTiket: 15000,
      ulasan: [
        { rating: 5, komentar: 'Pemandangan luar biasa!' },
        { rating: 4, komentar: 'Pas untuk jalan-jalan santai.' },
        { rating: 4, komentar: 'Ombak-nya landung, aman untuk keluarga.' },
      ],
      fasilitas: ['Parkir gratis', 'Toilet umum', 'Warung', 'Sunset spot', 'Perahu'],
    },
    {
      nama: 'Puncak Rinjani',
      kategori: 'Gunung',
      hargaTiket: 5000,
      ulasan: [
        { rating: 5, komentar: 'Pemandalam dari atas luar biasa.' },
        { rating: 3, komentar: 'Jalur pendakian terasa panjang.' },
      ],
      fasilitas: ['Pos jaga', 'Campur ringan', 'Toilet umum'],
    },
    {
      nama: 'Taman Ayat',
      kategori: 'Taman',
      hargaTiket: 2000,
      ulasan: [{ rating: 3, komentar: 'Teduh, tapi wahana kurang banyak.' }],
      fasilitas: ['Area piknik', 'Tempat ibadah', 'Toilet umum', 'Area anak'],
    },
    {
      nama: 'Gili Trawangan',
      kategori: 'Pulau',
      hargaTiket: 350000,
      ulasan: [],
      fasilitas: ['Speedboat', 'Penginapan', 'Restoran'],
    },
  ];

  for (const data of destinations) {
    const { ulasan, fasilitas, ...destinasiData } = data;
    await prisma.destinasi.create({
      data: {
        ...destinasiData,
        ulasan: { create: ulasan },
        fasilitas: { create: fasilitas.map((namaFasilitas) => ({ namaFasilitas })) },
      },
    });
  }

  const jumlahDestinasi = await prisma.destinasi.count();
  const jumlahUlasan = await prisma.ulasan.count();
  const jumlahFasilitas = await prisma.fasilitas.count();

  console.log(
    `Seed selesai: ${jumlahDestinasi} destinasi, ${jumlahUlasan} ulasan, ${jumlahFasilitas} fasilitas.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
