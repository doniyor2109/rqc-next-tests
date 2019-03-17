function createPubPropType(isRequired) {
  return function pubType(props, propName, componentName) {
    const prop = props[propName];
    if (prop === null) {
      if (isRequired) {
        throw new Error('Required pubType is empty');
      }
    } else if (typeof prop === 'object' && prop.type === 'publication') {
      return null;
    }
    return new TypeError(`Invalid Publication Prop Value: ${prop} for ${propName} in ${componentName}`);
  };
}
const pubType = createPubPropType(false);
pubType.isRequired = createPubPropType(true);

export default pubType