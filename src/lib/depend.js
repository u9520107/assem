import module from '../../src/api/module';

export default function depend(defaultDependence, Module) {
  return function generate(dependence) {
    return module({
      ...defaultDependence,
      dependence
    })(Module)
  }
}