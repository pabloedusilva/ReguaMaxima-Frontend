import { useState } from 'react'

// Helper function to generate file paths based on known file names
const getStickerFiles = (folderName: string): string[] => {
  const basePath = `/assets/images/stickers/${folderName}/`
  
  // Manually list files for each category
  const filesByCategory: Record<string, string[]> = {
    barbearia: [],
    bom_dia: [],
    boa_tarde: [
      '1(1).PNG', '1.PNG', '10(1).PNG', '10.PNG', '11(1).PNG', '11.PNG', '12.PNG', '13.PNG',
      '14.PNG', '15.PNG', '16.PNG', '17.PNG', '18.PNG', '19.PNG', '2.PNG', '20.PNG', '21.PNG',
      '22.PNG', '23.PNG', '24.PNG', '25.PNG', '26.PNG', '27.PNG', '28.PNG', '29.PNG', '3.PNG',
      '30.PNG', '31.PNG', '32.PNG', '33.PNG', '34.PNG', '35.PNG', '36.PNG', '37.PNG', '38.PNG',
      '4.PNG', '5.PNG', '6.PNG', '7(1).PNG', '7.PNG', '8.PNG', '9.PNG', 'aquele boa tarde.PNG',
      'BOM DIA - 10.PNG', 'BOM DIA - 12.PNG', 'BOM DIA - 7.PNG', 'Cópia de 1.png', 'Cópia de 2.png',
      'Cópia de 3.png', 'Cópia de 4.png', 'Cópia de 5.png', 'Cópia de 6.png', 'Cópia de Prancheta 1.png',
      'Cópia de Prancheta 15.png', 'Cópia de Prancheta 2.png', 'Cópia de Prancheta 3.png',
      'Cópia de Prancheta 4.png', 'Cópia de Prancheta 5.png', 'Cópia de Prancheta 6.png', 'IMG_4304.PNG'
    ],
    boa_noite: [],
    frases: [],
    favela: [],
    animadas: []
  }
  
  const files = filesByCategory[folderName] || []
  return files.map(file => `${basePath}${file}`)
}

// Sticker categories organized by folder names
const STICKER_CATEGORIES = {
  barbearia: {
    name: 'Barbearia',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
      </svg>
    ),
    files: getStickerFiles('barbearia')
  },
  bom_dia: {
    name: 'Bom Dia',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    files: getStickerFiles('bom_dia')
  },
  boa_tarde: {
    name: 'Boa Tarde',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    files: getStickerFiles('boa_tarde')
  },
  boa_noite: {
    name: 'Boa Noite',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
    files: getStickerFiles('boa_noite')
  },
  frases: {
    name: 'Frases',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    files: getStickerFiles('frases')
  },
  favela: {
    name: 'Favela',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    files: getStickerFiles('favela')
  },
  animadas: {
    name: 'Animadas',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    files: getStickerFiles('animadas')
  }
}

type CategoryKey = keyof typeof STICKER_CATEGORIES

export default function StickersGallery() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('barbearia')
  const [copiedSticker, setCopiedSticker] = useState<string | null>(null)
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null)

  const handleStickerClick = (sticker: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedSticker === sticker) {
      // Se já está selecionado, fecha
      setSelectedSticker(null)
    } else {
      // Seleciona o sticker
      setSelectedSticker(sticker)
    }
  }

  const handleCopySticker = async (stickerPath: string, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      // Fetch the image as blob
      const response = await fetch(stickerPath)
      const blob = await response.blob()
      
      // Copy to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ])
      
      setCopiedSticker(stickerPath)
      setTimeout(() => {
        setCopiedSticker(null)
        setSelectedSticker(null)
      }, 2000)
    } catch (error) {
      console.error('Erro ao copiar figurinha:', error)
      // Fallback: copy the URL instead
      try {
        await navigator.clipboard.writeText(stickerPath)
        setCopiedSticker(stickerPath)
        setTimeout(() => {
          setCopiedSticker(null)
          setSelectedSticker(null)
        }, 2000)
      } catch (err) {
        console.error('Erro ao copiar URL:', err)
      }
    }
  }

  const currentCategory = STICKER_CATEGORIES[selectedCategory]
  const hasStickers = currentCategory.files.length > 0

  return (
    <div className="grid gap-8">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="font-display text-4xl md:text-5xl text-gold mb-2">Galeria de Figurinhas</h1>
        <p className="text-text-dim">Clique na figurinha para selecionar, depois clique no botão para copiar</p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide animate-fade-in-delayed">
        {Object.entries(STICKER_CATEGORIES).map(([key, category]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key as CategoryKey)}
            className={`px-4 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all ${
              selectedCategory === key
                ? 'bg-gold text-[#0a0a0a] shadow-lg shadow-gold/20'
                : 'bg-surface text-text-dim hover:bg-surface-hover hover:text-text'
            }`}
          >
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Stickers Grid */}
      <div className="min-h-[400px]">
        {!hasStickers ? (
          <div className="card text-center py-16">
            <h3 className="text-xl font-semibold text-text mb-2">
              Nenhuma figurinha adicionada
            </h3>
            <p className="text-text-dim max-w-md mx-auto">
              Adicione seus arquivos de figurinhas na pasta<br />
              <code className="text-gold text-sm">public/assets/images/stickers/{selectedCategory}/</code>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-fade-in">
            {currentCategory.files.map((sticker, index) => (
              <div
                key={index}
                className="group relative aspect-square rounded-xl overflow-hidden bg-surface border border-border hover:border-gold/50 transition-all cursor-pointer"
                onClick={(e) => handleStickerClick(sticker, e)}
              >
                {/* Sticker Image */}
                <img
                  src={sticker}
                  alt={`${currentCategory.name} ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/assets/images/ui/default.jpg'
                  }}
                />

                {/* Overlay - Mostra quando selecionado ou hover */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 flex items-center justify-center ${
                  selectedSticker === sticker ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}>
                  <div className="text-center">
                    {copiedSticker === sticker ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
                          <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-green-500">Copiado!</span>
                      </div>
                    ) : selectedSticker === sticker ? (
                      <button
                        onClick={(e) => handleCopySticker(sticker, e)}
                        className="flex flex-col items-center gap-2 hover:scale-110 transition-transform"
                      >
                        <div className="w-12 h-12 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center">
                          <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gold">Copiar</span>
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
