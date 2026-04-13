export interface Brand {
  id: string
  name: string
  slug: string
  description?: string
  productCount: number
}

export const brands: Brand[] = [
  { id: 'b-axygen', name: 'Axygen', slug: 'axygen', description: 'Corning 산하 실험실 소모품 브랜드', productCount: 0 },
  { id: 'b-beckman', name: 'Beckman Coulter', slug: 'beckman-coulter', description: '원심분리기 및 분석 장비', productCount: 0 },
  { id: 'b-bio-rad', name: 'Bio-Rad', slug: 'bio-rad', description: '생명과학 연구 및 임상 진단', productCount: 0 },
  { id: 'b-chembio', name: 'CHEMBIO', slug: 'chembio', description: 'Chembio 자사 브랜드 — Tips, Tubes, 기기, 시약, Buffer', productCount: 25 },
  { id: 'b-corning', name: 'Corning', slug: 'corning', description: '세포배양, 유리기구, Filtration', productCount: 0 },
  { id: 'b-eppendorf', name: 'Eppendorf', slug: 'eppendorf', description: '피펫, 원심분리기, Thermomixer', productCount: 0 },
  { id: 'b-falcon', name: 'Falcon (Corning)', slug: 'falcon', description: '세포배양, 튜브, 플레이트', productCount: 0 },
  { id: 'b-gilson', name: 'Gilson', slug: 'gilson', description: '피펫 및 액체 핸들링 장비', productCount: 0 },
  { id: 'b-hamilton', name: 'Hamilton', slug: 'hamilton', description: '자동화 액체 핸들링 시스템', productCount: 0 },
  { id: 'b-invitrogen', name: 'Invitrogen (Thermo)', slug: 'invitrogen', description: '분자생물학 시약 및 키트', productCount: 0 },
  { id: 'b-kanto', name: 'Kanto Chemical', slug: 'kanto', description: '고순도 화학 시약', productCount: 0 },
  { id: 'b-labcon', name: 'Labcon', slug: 'labcon', description: '피펫팁, 튜브 등 실험실 소모품', productCount: 0 },
  { id: 'b-merck', name: 'Merck (Sigma-Aldrich)', slug: 'merck', description: '화학 시약, 생명과학 제품', productCount: 0 },
  { id: 'b-nalgene', name: 'Nalgene (Thermo)', slug: 'nalgene', description: '실험실 용기, 보관 용품', productCount: 0 },
  { id: 'b-olympus', name: 'Olympus (Evident)', slug: 'olympus', description: '현미경 및 광학 장비', productCount: 0 },
  { id: 'b-perkinelmer', name: 'PerkinElmer', slug: 'perkinelmer', description: '분석 장비, 플레이트 리더', productCount: 0 },
  { id: 'b-qiagen', name: 'QIAGEN', slug: 'qiagen', description: 'DNA/RNA 추출 키트, PCR', productCount: 0 },
  { id: 'b-rainin', name: 'Rainin (Mettler Toledo)', slug: 'rainin', description: 'LTS 피펫 및 팁', productCount: 0 },
  { id: 'b-sartorius', name: 'Sartorius', slug: 'sartorius', description: '저울, Filtration, 바이오프로세스', productCount: 0 },
  { id: 'b-tecan', name: 'Tecan', slug: 'tecan', description: '자동화 분석 장비', productCount: 0 },
  { id: 'b-thermo', name: 'Thermo Fisher Scientific', slug: 'thermo', description: '과학 기기, 시약, 소모품 종합', productCount: 0 },
  { id: 'b-vwr', name: 'VWR (Avantor)', slug: 'vwr', description: '실험실 용품 유통', productCount: 0 },
  { id: 'b-watson', name: 'Watson Bio Lab', slug: 'watson', description: '일본제 피펫팁, 튜브', productCount: 0 },
  { id: 'b-zymo', name: 'Zymo Research', slug: 'zymo', description: 'DNA/RNA 정제, Epigenetics', productCount: 0 },
]
