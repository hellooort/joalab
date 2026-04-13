export interface OrderData {
  id: string
  customer: string
  company: string
  role: '일반고객' | '사업자' | '대리점'
  items: OrderItemData[]
  shippingFee: number
  status: string
  date: string
  address: string
}

export interface OrderItemData {
  name: string
  option: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export const ORDERS: OrderData[] = [
  {
    id: 'JL-20260327-001',
    customer: '김소비',
    company: '대구대학교',
    role: '일반고객',
    items: [
      { name: 'CB Universal Tips', option: 'CB-T200 (1-200μL, 1000tips/bag)', quantity: 2, unitPrice: 12000, totalPrice: 24000 },
      { name: 'Centrifuge Tubes 15mL', option: 'CT-15 (50본/Rack)', quantity: 5, unitPrice: 8500, totalPrice: 42500 },
    ],
    shippingFee: 3000,
    status: 'paid',
    date: '2026-03-27',
    address: '대구 북구 대학로 123 자연과학관 301호',
  },
  {
    id: 'JL-20260327-002',
    customer: '이업체',
    company: '(주)바이오텍',
    role: '사업자',
    items: [
      { name: 'Nitrile Examination Gloves', option: 'GL-NT-M (M사이즈, 250매)', quantity: 5, unitPrice: 25200, totalPrice: 126000 },
    ],
    shippingFee: 0,
    status: 'preparing',
    date: '2026-03-27',
    address: '서울 강남구 테헤란로 456 바이오텍빌딩 5층',
  },
  {
    id: 'JL-20260326-003',
    customer: '박대리',
    company: '조아랩 대구지점',
    role: '대리점',
    items: [
      { name: 'PBS (Phosphate Buffered Saline)', option: 'CB-PBS500 (pH 7.4, 500mL)', quantity: 10, unitPrice: 6400, totalPrice: 64000 },
      { name: 'TBS-T (0.1% Tween20)', option: 'CB-TBST1L (1L)', quantity: 5, unitPrice: 11200, totalPrice: 56000 },
    ],
    shippingFee: 0,
    status: 'shipping',
    date: '2026-03-26',
    address: '대구 수성구 범어로 789 조아랩빌딩 2층',
  },
  {
    id: 'JL-20260326-004',
    customer: '최연구',
    company: '한국과학기술원',
    role: '일반고객',
    items: [
      { name: 'CB Universal Tips', option: 'CB-T200 (1-200μL, 1000tips/bag)', quantity: 4, unitPrice: 12000, totalPrice: 48000 },
    ],
    shippingFee: 0,
    status: 'delivered',
    date: '2026-03-26',
    address: '대전 유성구 대학로 291 화학관 205호',
  },
  {
    id: 'JL-20260325-005',
    customer: '정바이오',
    company: '(주)정바이오',
    role: '사업자',
    items: [
      { name: 'Restriction Enzyme Set', option: 'CB-ECO (EcoRI 10,000U)', quantity: 2, unitPrice: 49500, totalPrice: 99000 },
      { name: 'DNA Ladder', option: 'CB-1KB (1KB, 500μL)', quantity: 3, unitPrice: 40500, totalPrice: 121500 },
      { name: 'TAE Buffer', option: 'CB-TAE50 (50X, 1L)', quantity: 5, unitPrice: 16200, totalPrice: 81000 },
    ],
    shippingFee: 0,
    status: 'delivered',
    date: '2026-03-25',
    address: '경기 성남시 분당구 판교로 321 정바이오랩 3층',
  },
  {
    id: 'JL-20260325-006',
    customer: '한실험',
    company: '경북대학교',
    role: '일반고객',
    items: [
      { name: 'Centrifuge Tubes 50mL', option: 'CT-50 (25본/Rack)', quantity: 10, unitPrice: 9800, totalPrice: 98000 },
    ],
    shippingFee: 0,
    status: 'cancelled',
    date: '2026-03-25',
    address: '대구 북구 대학로 80 생명과학관 102호',
  },
  {
    id: 'JL-20260324-007',
    customer: '박대리',
    company: '조아랩 대구지점',
    role: '대리점',
    items: [
      { name: 'Chembio Vortex Mixer', option: 'CB-VX-S (고정속도)', quantity: 1, unitPrice: 144000, totalPrice: 144000 },
    ],
    shippingFee: 0,
    status: 'delivered',
    date: '2026-03-24',
    address: '대구 수성구 범어로 789 조아랩빌딩 2층',
  },
]

export const STATUS_MAP: Record<string, { label: string; color: string }> = {
  paid: { label: '결제완료', color: 'bg-blue-50 text-blue-600' },
  preparing: { label: '상품준비', color: 'bg-yellow-50 text-yellow-600' },
  shipping: { label: '배송중', color: 'bg-purple-50 text-purple-600' },
  delivered: { label: '배송완료', color: 'bg-green-50 text-green-600' },
  cancelled: { label: '취소', color: 'bg-red-50 text-red-600' },
}
