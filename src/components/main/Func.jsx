import React from 'react';

const Func = () => {
  return (
    <div className="main-content Func-content">
      <div className="main-title">
        <div className="sub-title ">
          <h1>모든 <span>협업</span>이 이루어지는 곳</h1>
          <p>허브플로우에서 새로운 협업문화가 자라납니다.</p>
        </div>
      </div>

      {/* 실시간 협업 */}
      <div className="feature-block live">
        <img src="/images/function1.jpg" className="feature-image" alt="실시간 협업" />
        <div className="feature-content">
          <h1>실시간 협업</h1>
          <section>
            <h3>주제별 대화방</h3>
            <p>
              조직 구성과 업무 문화에 맞게 주제별 대화방을 개설해 효율적으로
              소통할 수 있습니다. 대화방은 상황에 맞게 공개 또는 비공개 설정을
              할 수 있고, 게시판 형태의 보드뷰는 관리자가 공지 용도로 이용하기에
              용이합니다.
            </p>
          </section>
          <section>
            <h3>할 일 관리</h3>
            <p>
              할 일 기능을 통해 업무 담당자를 지정하고 프로젝트를 관리하세요.
              나의 할 일 또는 팀의 할 일을 만들어서 협업할 내용을 진척률과 함께
              관리할 수 있고, 캘린더 형태로 할 일 정보를 확인할 수도 있습니다.
            </p>
          </section>
          <section>
            <h3>문서 미리보기</h3>
            <p>
              한글, 워드, 엑셀, 파워포인트, 이미지 등 문서를 PC/모바일 상관없이
              간편하게 미리보기 할 수 있습니다.
            </p>
          </section>
        </div>
      </div>

      {/* 멤버 관리 */}
      <div className="feature-block member">
        <img src="/images/function2.jpg" className="feature-image" alt="멤버 관리" />
        <div className="feature-content">
          <h1>멤버 관리</h1>
          <section>
            <h3>정회원/준회원</h3>
            <p>
              구성원을 정회원 혹은 준회원으로 지정해 멤버별 정보 접근 권한을
              구분 지을 수 있습니다. 정회원은 공개된 토픽 및 콘텐츠에 접근
              가능하며 자신이 작성한 콘텐츠의 소유 권한을 가지는 반면, 준회원은
              초대된 토픽과 공유받은 콘텐츠에만 접근이 가능합니다.
            </p>
          </section>

          <section>
            <h3>입/퇴사자 관리</h3>
            <p>
              관리자 메뉴를 통해 입/퇴사자 관리도 손쉽게 가능합니다. 퇴사한
              멤버는 더이상 정보에 접근이 불가하지만 퇴사한 멤버가 작성한
              메시지나 파일은 사용자가 직접 삭제하지 않는 이상 허브플로우에
              영구적으로 보존됩니다.
            </p>
          </section>

          <section>
            <h3>조직도</h3>
            <p>
              아시아 업무 문화에 딱 맞는 조직도 기능을 통해 빠른 협업이
              가능합니다. 1,000명 이상 조직의 경우, API를 통해 조직관리 시스템과
              연동이 가능합니다.
            </p>
          </section>
        </div>
      </div>

      {/* 기업 정보 자산화 */}
      <div className="feature-block data">
        <img src="/images/function3.jpg" className="feature-image" alt="기업 정보 자산화" />
        <div className="feature-content">
          <h1>기업 정보 자산화</h1>
          <section>
            <h3>허브플로우 드라이브</h3>
            <p>
              자체 제공하는 드라이브에 주요 문서와 파일을 안전하게 보관할 수
              있습니다. 드라이브 내에 폴더를 만들어 파일을 체계적으로 관리할 수
              있고 드라이브 내 자산화된 자료를 대화방으로 손쉽게 공유가
              가능합니다.
            </p>
          </section>

          <section>
            <h3>스마트 검색</h3>
            <p>
              쉽고 똑똑한 검색 기능으로 3초 이내에 문서나 대화 내용을 찾을 수
              있습니다. 참여한 대화방별, 멤버별, 기간별로 세세하게 검색 옵션을
              설정한 뒤 필요한 자료를 쉽고 빠르게 검색해 보세요.
            </p>
          </section>

          <section>
            <h3>메시지 영구보관</h3>
            <p>
              허브플로우에서 공유하는 모든 메시지와 파일은 암호화되어 서버에
              저장되며, 직접 삭제하지 않는 한 영구적으로 보존됩니다.
              영구보존되는 메시지를 통해 업무 히스토리 파악과 인수인계가
              쉬워집니다.
            </p>
          </section>
        </div>
      </div>

      {/* 업무의 허브 */}
      <div className="feature-block hub">
        <img src="/images/function4.jpg" className="feature-image" alt="업무의 허브" />
        <div className="feature-content">
          <h1>업무의 허브</h1>
          <section>
            <h3>허브플로우 캘린더</h3>
            <p>
              캘린더를 통해 개인과 팀의 일정을 공유하고 관리할 수 있습니다. 전사
              캘린더를 활용하면 별도의 공지 없이 전체 일정을 구성원들과 쉽고
              빠르게 나눌 수 있으며 일정의 생성, 수정 등 변동사항이 알림으로
              발송돼 업무 누락을 방지할 수 있습니다.
            </p>
          </section>

          <section>
            <h3>허브플로우 커넥트</h3>
            <p>
              업무에 필요한 서비스들의 메시지 알림을 허브플로우로 모아 받으면
              업무 커뮤니케이션 툴을 일원화할 수 있습니다. 구글 캘린더와 연동을
              통해 일정 관리가 쉬워지고, GitHub, JIRA 등 버전 관리와 이슈 파악이
              용이한 외부 서비스들과 연동하여 업무 효율을 높일 수 있습니다.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Func;
