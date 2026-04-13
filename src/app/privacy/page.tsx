export default function PrivacyPage() {
  return (
    <div className="container-custom py-12 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">개인정보처리방침</h1>
      <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">1. 개인정보의 수집 및 이용목적</h2>
          <p>(주) 조아진(이하 "회사")은 다음의 목적을 위하여 개인정보를 처리합니다.</p>
          <ul className="list-disc ml-5 space-y-1">
            <li><strong>회원가입 및 관리:</strong> 본인 확인, 개인식별, 불량회원 부정이용 방지, 서비스 부정 이용 방지, 각종 고지·통지</li>
            <li><strong>재화 또는 서비스 제공:</strong> 물품배송, 서비스 제공, 요금결제·정산, 콘텐츠 제공</li>
            <li><strong>마케팅 및 광고:</strong> 신규 서비스 개발, 이벤트 및 광고성 정보 제공, 접속 빈도 파악, 서비스 이용에 대한 통계</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">2. 수집하는 개인정보의 항목</h2>
          <p>회사는 회원가입, 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
          <ul className="list-disc ml-5 space-y-1">
            <li><strong>필수항목:</strong> 이름, 로그인ID, 비밀번호, 이메일, 연락처</li>
            <li><strong>선택항목:</strong> 회사명, 사업자등록번호, 주소</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">3. 개인정보의 보유 및 이용기간</h2>
          <p>회원의 개인정보는 회원 탈퇴 시까지 보유합니다. 다만, 관계 법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 관계 법령에서 정한 기간 동안 회원정보를 보관합니다.</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
            <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
            <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">4. 개인정보의 파기 절차 및 방법</h2>
          <p>회사는 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">5. 개인정보 보호책임자</h2>
          <ul className="list-none space-y-1">
            <li>이름: 임경준</li>
            <li>직위: 대표이사</li>
            <li>연락처: 02-3463-7190</li>
            <li>이메일: sales@joagene.com</li>
          </ul>
        </section>
        <div className="pt-4 border-t text-xs text-gray-400">
          <p>시행일: 2025년 3월 1일</p>
          <p>상호: (주) 조아진 | 대표: 임경준 | 사업자번호: 119-81-98001</p>
        </div>
      </div>
    </div>
  )
}
