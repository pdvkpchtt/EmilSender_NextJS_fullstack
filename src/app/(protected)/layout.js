import { auth, signOut } from "@/auth";

import SettingsNav from "@/components/settings/SettingsNav";
import TextMain from "@/shared/text/TextMain";
import TextSecondary from "@/shared/text/TextSecondary";
import Card from "@/shared/ui/Card";
import SignOutIcon from "@/shared/icons/SignOutIcon";

const SettingsLayout = async ({ children }) => {
  const { user } = await auth();

  return (
    <div className="flex flex-row gap-[12px] max-w-[1024px] [@media(pointer:coarse)]:flex-col w-full p-[12px] mx-auto">
      {/* left side */}
      <div className="flex flex-col gap-[12px] [@media(hover)]:fixed top-[12px]">
        <Card style="w-fit flex flex-row w-full gap-[20px]">
          <div className="flex flex-col w-full">
            <TextMain text={user?.name} style="font-medium" />
            <TextSecondary text={user?.email} style="font-medium text-[14px]" />
          </div>

          <form
            action={async () => {
              "use server";

              await signOut();
            }}
          >
            <SignOutIcon />
          </form>
        </Card>

        <SettingsNav />
      </div>
      {/* left side */}

      {/* right side */}
      {children}
      {/* right side */}
    </div>
  );
};

export default SettingsLayout;
