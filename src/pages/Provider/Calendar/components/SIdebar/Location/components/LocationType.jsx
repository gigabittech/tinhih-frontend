import Button from "../../../../../../../components/ui/Button";

const locationTypes = [
  {
    type: "PERSON",
    id: 8,
    name: "In-person meeting",
    description: "Set a physical address",
  },
  {
    type: "PHONE",
    id: 9,
    name: "Phone call",
    description: "Inbound or outbound calls",
  },
  {
    type: "ONLINE",
    id: 11,
    name: "Google Meet",
    description: "Web conference",
  },
  {
    type: "ONLINE",
    id: 12,
    name: "Zoom",
    description: "Web conference / virtual location",
  },
  {
    type: "ONLINE",
    id: 13,
    name: "Doxy.me",
    description: "Web conference / virtual location",
  },
  {
    type: "ONLINE",
    id: 14,
    name: "Microsoft Teams",
    description: "Web conference / virtual location",
  },
];

const LocationPlaceholder = () => (
  <p className="text-context-lighter/90 font-normal">
    Add physical or virtual locations
  </p>
);

const LocationMenu = ({ options = locationTypes, onClick }) => {
  return (
    <ul className="py-2">
      {options.map((item, index) => (
        <li key={index}>
          <Button
            variant="option"
            type="button"
            onClick={() => onClick(item)}
            className="py-6 flex gap-2 items-center"
          >
            <div className="size-5 flex items-center justify-center">
              {item.logo ? (
                <img
                  src={item.logo}
                  alt={`location-${index}`}
                  className="h-full w-auto object-contain"
                />
              ) : (
                <svg
                  className="size-6 fill-context-dark/60"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_131_13325)">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" />
                  </g>
                  <defs>
                    <clipPath id="clip0_131_13325">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-context-dark">{item.name}</p>
              <p className="text-xs text-context-light">{item.description}</p>
            </div>
          </Button>
        </li>
      ))}
    </ul>
  );
};

const SelectedLocationPlaceholder = ({ item }) => (
  <div className="flex gap-2 items-center">
    <div className="size-5 flex items-center justify-center">
      {item.logo ? (
        <img
          src={item.logo}
          alt={`location-${item.id}`}
          className="h-full w-auto object-contain"
        />
      ) : (
        <svg
          className="size-5 fill-context-dark/60"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_131_13325)">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" />
          </g>
          <defs>
            <clipPath id="clip0_131_13325">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
    </div>
    <p className="text-context-dark">{item.name}</p>
  </div>
);

export { LocationPlaceholder, LocationMenu, SelectedLocationPlaceholder };
