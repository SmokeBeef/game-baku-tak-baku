import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  CardAction 
} from "@/components/ui/card" // Sesuaikan path ini dengan lokasi file card Anda

export default function CenteredCardPage() {
  return (
    // 1. CONTAINER UTAMA (Parent)
    // min-h-screen: Memastikan tinggi container setidaknya setinggi layar penuh.
    // flex items-center justify-center: Kunci untuk menaruh konten tepat di tengah (vertikal & horizontal).
    // bg-...: Memberikan background gelap dengan gradasi halus untuk kedalaman (depth).
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-4">
      
      {/* 2. CARD COMPONENT */}
      {/* w-full max-w-md: Membatasi lebar card agar proporsional */}
      {/* backdrop-blur: Efek kaca (glassmorphism) agar menyatu dengan background */}
      <Card className="w-full max-w-[380px] border-white/10 bg-black/40 text-white backdrop-blur-md shadow-2xl animate-in fade-in zoom-in duration-500">
        
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-light tracking-wide text-white">
                Akses Sistem
              </CardTitle>
              <CardDescription className="text-neutral-400 mt-1.5">
                Verifikasi identitas diperlukan.
              </CardDescription>
            </div>
            {/* Contoh penggunaan CardAction untuk status */}
            <CardAction>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </CardAction>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="h-10 rounded-md bg-white/5 border border-white/10 px-3 flex items-center text-sm text-neutral-500">
              user@example.com
            </div>
            <div className="h-2 rounded-full bg-neutral-800 overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
            </div>
            <p className="text-xs text-neutral-500 text-right">Memuat data profil...</p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <button className="text-sm text-neutral-400 hover:text-white transition-colors">
            Batalkan
          </button>
          <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            Lanjutkan
          </button>
        </CardFooter>

      </Card>
    </div>
  )
}
