import { YMInitializer } from 'react-yandex-metrika'

class Metrika extends React.Component {

  componentDidMount(){
    ym.init([51213086])
  }

  render() {
    return (
      <div>
        // SNIP
          <YMInitializer accounts={[51213086]} options={{webvisor: true}} version="2" />
        // SNIP
      </div>
    )
  }
}

export default Metrika