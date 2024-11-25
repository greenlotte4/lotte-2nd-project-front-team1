
export default function ProjectHeader(){
    return (
        <header className="header">
        <div className="headerTitle">
          <button className="headerButton" id="toggle-sidebar">
            <img src="/images/hamburger.png" alt="" />
          </button>
          <img src="/images/speech-bubble.png" alt="💬" />
          <a href="" className="headerTitleName">
            <img src="/images/logo-2.png" alt="" />
          </a>
        </div>
        <div className="headerArticle">
          <a href="" className="headerIcon">
            <img src="/images/calendar.png" alt="🗂️" />
          </a>
          <a href="" className="headerIcon">
            <img src="/images/speech-bubble.png" alt="💬" />
          </a>
          <a href="" className="headerIcon">
            <img src="/images/calendar.png" alt="📅" />
          </a>
          <img src="/images/user_Icon.png" alt="👤" />
          <p className="ProfileName">billie Joel</p>
        </div>
      </header>
    );
}