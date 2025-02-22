import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { DataTypes } from "../Models";

function UserForm({
  handleSubmit,
  setOpen,
}: {
  handleSubmit: any;
  setOpen: any;
}) {
  function handleChange(event: any) {
    const value = event.target.value as string;
    const name = event.target.name as "name" | "short" | "email";
    setFormData({ ...formData, [name]: value });
  }
  const doSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit(DataTypes.User, formData)
    .then(() => setOpen(false), (e: string) => setErr(e))
    .catch((e: string) => {setErr(e)});
  };
  const [err, setErr] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    short: "",
    email: "",
  });
  return (
    <div>
      <Dialog.Title className="pl-2 font-bold text-lg">Add User</Dialog.Title>
      <Dialog.Description className="break-normal py-1">
        No registration required. Just add your real and arcade name
      </Dialog.Description>
      <form
        onSubmit={doSubmit}
        className="grid grid-cols-1 justify-items-center outline-offset-1"
      >
        <label className="my-1">
          <span className="block">Name:</span>
          <input
            name="name" type="text"
            placeholder="Wonder Boy"
            value={formData.name}
            onChange={handleChange}
            required={true}
            className="p-1 outline outline-1 outline-stone-400 rounded-md valid:outline-green-500"
          /> </label>
        <label className="my-1">
          <span className="block">Arcade Name:</span>
          <input
            name="short"
            type="text"
            value={formData.short}
            onChange={handleChange}
            placeholder="AAA"
            required={true}
            maxLength={3}
            pattern={"[A-Z]{3}"}
            className="p-1 outline outline-1 outline-stone-400 rounded-md invalid:outline-red-400 valid:outline-green-500"
          />
        </label>
        <label className="my-1">
          <span className="block">Email (optional):</span>
          <input
            name="email"
            type="text"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            className="p-1 outline outline-1 outline-stone-400 rounded-md"
          />
        </label>
        <div
          id="buttonBar"
          className="inline pt-2 text-stone-100 font-bold"
        >
          <button
            className="mx-3 px-2 py-1 bg-violet-700 rounded-lg"
            onClick={() => {
              setOpen(false);
            }}
          >
            Close
          </button>
          <button
            type="submit"
            className="mx-3 px-2 py-1 bg-violet-700 rounded-lg"
          >
            Add New User
          </button>
        </div>
        <div className={"text-red-600 "+ (!!err ? "" : "display-none")}>{err}</div>
      </form>
    </div>
  );
}

export default UserForm;
