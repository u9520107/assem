import module from '../../src/api/module';

export default function assemble(defaultDependence, Module) {
  return function generate(dependence) {
    return module({
      ...defaultDependence,
      dependence
    })(Module)
  }
}