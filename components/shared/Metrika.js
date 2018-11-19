import { YMInitializer } from 'react-yandex-metrika'

class Metrika extends React.Component {
  render() {
    return (
      <div>
          <YMInitializer accounts={[51213086]} options={{webvisor: true}} version="2" />
      </div>
    )
  }
}

export default Metrika