import { Link } from "react-router-dom";

export default function NavBarButton(props: any) {
    return (
        <Link to={props.link}>
            <div
            className={"nav-bar-button" + (props.isSelected ? " nav-bar-button--selected" : "")}
            onClick={props.onClick}>
                {props.label}
            </div>
        </Link>
    );
}