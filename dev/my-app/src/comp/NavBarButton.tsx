export default function NavBarButton(props: any) {
    return (
        <div
        className={"nav-bar-button" + (props.isSelected ? " nav-bar-button--selected" : "")}
        onClick={props.onClick}>
            {props.label}
        </div>
    );
}