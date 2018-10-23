import React, { Component } from 'react'
import RoomView from './RoomView';
import { withRouter } from 'react-router-dom';

class RoomViewFetcher extends Component {
  state = {
    //fake data
    data: null
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    //fake api call to download room data goes here
    // try {
    //  const response = await fetch(`https://api.hotelblack92/roomData/${id}`);
    //  const json = await response.json();
    // this.setState({ data: json });
    // } catch (error) {
    //  console.log(error);
    // }
    setTimeout(() => {
      this.setState({data: FAKE_JSON});
    }, 1000)
  }
  render() {
    return (
      <RoomView roomData={this.state.data} />
    )
  }
}

export default withRouter(RoomViewFetcher)


const FAKE_JSON = {
  name: "Apartment Blue",
  desc: "Phased contextually-based model",
  longDesc: "Lorem ipsum dolor sit amet, fabellas facilisi assentior mea in, prompta menandri" +
      " iracundia pri eu. Eum ea volumus eligendi, te magna habeo duo. Cum homero volup" +
      "tatum te, esse consul tractatos ut nam. In nam rebum simul aliquando, ius et nul" +
      "la exerci vocibus, autem signiferumque pri et. An rebum minim electram vim, qui " +
      "ex graece sapientem. Nibh constituam cu mei. Nostro scaevola ne per, quis zril n" +
      "ostro ius ad, mutat admodum facilisi an qui. Quo ad sonet definitionem, sea eu d" +
      "ictas offendit abhorreant, noster facilis definitiones no pri. Quem fierent ea n" +
      "ec, eu meliore sententiae est. Quot eros molestie ex mea, has eu libris scribent" +
      "ur dissentiunt, te vitae graece eam. Vix te omnes mollis audiam, patrioque susci" +
      "piantur ea vis.",
  images: ['https://i.imgur.com/G2WYQoC.jpg', 'https://i.imgur.com/edofhYg.jpg', 'https://i.imgur.com/7R7KW10.jpg'],
  features: [
    {
      description: 'Cheaper',
      bigText: '15%'
    },
    {
      description: 'Faster',
      bigText: '2x'
    },
    {
      description: 'Better', 
      bigText: '8x'
    },
  ]
}
