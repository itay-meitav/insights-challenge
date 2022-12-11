type Tprops = {
  heading: string;
  des: string;
};

export default function Heading(props: Tprops) {
  return (
    <div className="flex flex-col items-start justify-between">
      <h2 className="text-2xl font-bold leading-7 text-gray-900">
        {props.heading}
      </h2>
      <p className="mt-2 text-sm text-gray-500  w-3/4 mbp:hidden">
        {props.des}
      </p>
    </div>
  );
}
