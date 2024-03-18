import { getServerSession } from "next-auth";
import { authOptions } from "../../app/lib/auth";

import Save from "./getsave";
import Link from "next/link";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <>
      <section className="">
        <div className="">
          <div>
            {!user ? (
              <div>
                <p>Get Inspired!</p>
                <p>Save inspiration and products. </p>
                <button>Login</button>
                <Link href="/login">Login</Link>
              </div>
            ) : (
              <div className="py-3">
                <div className="py-5 min-h-[80px] bg-beige-70 flex gap-3 justify-center items-center">
                  <p>Hi {user.name}!</p>
                  <p>We're showing your Save inspiration!</p>
                  <p>
                    Not you?{" "}
                    <Link
                      href="/quiz-test"
                      className="text-ct-dark-600 underline"
                    >
                      Let find out Your Style!
                    </Link>{" "}
                    or{" "}
                    <Link
                      href="/design-idea"
                      className="text-ct-dark-600 underline"
                    >
                      Get some inspiration
                    </Link>
                  </p>
                </div>

                <div className="lg:py-10 lg:px-12">
                  <Save email={user} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
