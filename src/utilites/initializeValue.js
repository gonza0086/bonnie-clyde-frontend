export function initializeValueObject(children) {
    let initialIsValidObject = {};

    children.forEach(component => {
        initialIsValidObject[component.props.id] = !component.props.required || component.props.initialValue !== undefined;
    });

    return initialIsValidObject;
}
