export default function TermsPage() {
  return (
    <div className="container-custom py-12 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">이용약관</h1>
      <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">제1조 (목적)</h2>
          <p>이 약관은 (주) 조아진(이하 "회사")이 운영하는 인터넷 쇼핑몰 JoaLab(이하 "몰")에서 제공하는 전자상거래 관련 서비스(이하 "서비스")를 이용함에 있어 회사와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">제2조 (정의)</h2>
          <p>"몰"이란 회사가 재화 또는 용역(이하 "재화 등")을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말합니다.</p>
          <p>"이용자"란 "몰"에 접속하여 이 약관에 따라 "몰"이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">제3조 (약관의 게시와 개정)</h2>
          <p>회사는 이 약관의 내용과 상호, 영업소 소재지 주소, 대표자의 성명, 사업자등록번호, 연락처 등을 이용자가 쉽게 알 수 있도록 "몰"의 초기 서비스 화면에 게시합니다.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">제4조 (서비스의 제공 및 변경)</h2>
          <p>회사는 다음과 같은 업무를 수행합니다.</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>재화 또는 용역에 대한 정보 제공 및 구매계약의 체결</li>
            <li>구매계약이 체결된 재화 또는 용역의 배송</li>
            <li>기타 회사가 정하는 업무</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">제5조 (회원가입)</h2>
          <p>이용자는 "몰"이 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">제6조 (서비스 이용시간)</h2>
          <p>서비스 이용은 회사의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간 운영을 원칙으로 합니다.</p>
        </section>
        <div className="pt-4 border-t text-xs text-gray-400">
          <p>시행일: 2025년 3월 1일</p>
          <p>상호: (주) 조아진 | 대표: 임경준 | 사업자번호: 119-81-98001</p>
        </div>
      </div>
    </div>
  )
}
