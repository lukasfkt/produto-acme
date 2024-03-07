import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "../../hooks/useUser";

import { InputLogin } from "../../components/Input";
import { LinearButton } from "../../components/LinearButton";

const loginFormSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type loginFormInputs = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<loginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  });

  const { login } = useUser();
  const navigate = useNavigate();

  async function handleLogin(data: loginFormInputs) {
    console.log(data);
    const { authenticated } = await login(data.username, data.password);
    if (authenticated) {
      navigate("/home");
    }
    // const response = await login(data);
    // if (response) {
    //   if (response.roles === "super_admin") {
    //     navigate("/home");
    //   } else {
    //     if(response.error === 160) {
    //       navigate('/approval-process')
    //     } else if (response.error === 161) {
    //       navigate('/invite-request')
    //     } else {
    //       navigate(`/workspace/${response.workspaces.uuid}/home`);
    //     }
    //   }
    // }
  }

  return (
    <section className="flex flex-col justify-center items-center h-full text-primary-rich-black max-h-screen overflow-y-auto">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col gap-12 mb-40"
      >
        <h1 className="text-5xl max-md:text-3xl text-azulfy-rich-black mb-2 text-center md:min-w-[350px]">
          Welcome Back!{" "}
        </h1>
        <div className="flex flex-col gap-5">
          <InputLogin
            {...register("username")}
            icon="username"
            type="text"
            required
            placeholder="E-mail"
          />
          <InputLogin
            {...register("password")}
            icon="password"
            type="password"
            required
            placeholder="Password"
            showPassword
          />
        </div>
        <LinearButton disabled={isSubmitting} type="submit" text="Login" />
      </form>
    </section>
  );
}
