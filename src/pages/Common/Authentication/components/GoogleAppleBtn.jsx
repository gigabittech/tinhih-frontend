import React from "react";
import Button from "../../../../components/ui/Button";
import GoogleIcon from "../../../../assets/icons/google_icon.png";
import AppleIcon from "../../../../assets/icons/apple_icon.png";

function GoogleAppleBtn() {
  return (
    <div className="space-x-2 flex mt-5">
      <Button variant="outline" className="w-1/2 border-outline-medium">
        <span>
          <img className="size-5" src={GoogleIcon} alt="google logo" />
        </span>
        <span className="text-context-dark">Google</span>
      </Button>
      <Button variant="outline" className="w-1/2 border-outline-medium">
        <span>
          <img className="size-5" src={AppleIcon} alt="apple logo" />
        </span>
        <span className="text-context-dark">Apple</span>
      </Button>
    </div>
  );
}

export default GoogleAppleBtn;
