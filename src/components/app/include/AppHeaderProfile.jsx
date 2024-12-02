import * as React from "react";
import {
  AuthenticationContext,
  SessionContext,
} from "@toolpad/core/AppProvider";
import { Account } from "@toolpad/core/Account";

const demoSession = {
  user: {
    name: "이순신",
    email: "Lee1234@gmail.com",
    image: "/images/user_Icon.png",
  },
};

export default function AccountDemoSignedIn() {
  const [session, setSession] = React.useState(demoSession);
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession(demoSession);
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  return (
    <AuthenticationContext.Provider value={authentication}>
      <SessionContext.Provider value={session}>
        {/* preview-start */}
        <Account />
        {/* preview-end */}
      </SessionContext.Provider>
    </AuthenticationContext.Provider>
  );
}
