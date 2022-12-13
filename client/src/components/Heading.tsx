type Tprops = {
  heading: string;
  des: string;
};

export default function Heading(props: Tprops) {
  return (
    <div className="flex flex-col items-start justify-between">
      <h1 className="text-2xl font-black text-gray-900">{props.heading}</h1>
      <p className="mt-2 text-sm text-gray-500  w-3/4 mbp:hidden">
        {props.des}
      </p>
    </div>
  );
}
