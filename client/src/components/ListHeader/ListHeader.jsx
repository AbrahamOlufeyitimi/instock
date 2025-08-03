import Button from "../Button/Button";
import SearchInput from "../SearchInput/SearchInput";
import searchIcon from "../../assets/icons/search-24px.svg";
import "./ListHeader.scss";

const ListHeader = ({ title, buttonText, icon, path, setSearchTerm }) => {
  return (
    <div className="header-list">
      <h1 className="header-list__heading">{title}</h1>
      <div className="header-list__actions">
        <SearchInput
          icon={searchIcon}
          text="Search..."
          setSearchTerm={setSearchTerm}
        />
        <Button text={buttonText} path={path} icon={icon} />
      </div>
    </div>
  );
};

export default ListHeader;
