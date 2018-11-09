import React, { Component } from 'react';
import {
  Tabs,
  TabsPanel,
  TabTitle,
  TabsContainer,
  Tab
} from '../../Components/Tabs';
import styled from 'styled-components';
import phoneIcon from '../../images/phone.svg';
import pinIcon from '../../images/pin.svg';
import socialIcon from '../../images/social.svg';
import mailIcon from '../../images/mail.svg';
import fbIcon from '../../images/facebook.svg';
import youtubeIcon from '../../images/youtube.svg';
import instagramIcon from '../../images/instagram.svg';
import twitterIcon from '../../images/twitter.svg';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import { Button } from '../../Components/Buttons';

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(0, auto) minmax(auto, 960px) minmax(0, auto);
`;

const MainContent = styled.div`
  grid-column: 2 / span 1;
  padding-top: 80px;
  position: relative;
  width: 80%;
  margin: 0 auto;

  @media only screen and (max-width: 425px) {
    width: 98%;
  }
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 16px;
  margin-left: 10px;
  color: rgb(150, 150, 150);
`;

const P = styled.p`
  font-weight: 600;
  color: rgba(40, 40, 40);
  font-size: 18px;
`;

const Mail = styled.a`
  font-weight: 600;
  color: rgba(40, 40, 40);
  font-size: 18px;
`;

const NoDecorationLink = styled(Link)`
  text-decoration: none;
  padding-right: 20px;
`;

const Icon = styled.img`
  width: 25px;
  filter: brightness(0);
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
`;

const InfoField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const MapContainer = styled.div`
  height: 50vh;
`;

export default class Contact extends Component {
  render() {
    return (
      <Container>
        <MainContent>
          <Tabs>
            <TabsPanel>
              <TabTitle>Info</TabTitle>
              <TabTitle>Ask us!</TabTitle>
              <TabTitle>Map</TabTitle>
            </TabsPanel>
            <TabsContainer>
              <Tab>
                <Info />
              </Tab>
              <Tab>
                <ContactForm />
              </Tab>
              <Tab>
                <MapContainer>
                  <GoogleMapReact
                    defaultCenter={{
                      lat: 0.0,
                      lng: 0.0
                    }}
                    zoom={11}
                  />
                </MapContainer>
              </Tab>
            </TabsContainer>
          </Tabs>
        </MainContent>
      </Container>
    );
  }
}

const Info = () => (
  <React.Fragment>
    <InfoField>
      <Row>
        <Icon src={pinIcon} />
        <Label>Adress</Label>
      </Row>
      <P>574 Cronin Cliffs, Edenton Cambridgeshire</P>
      <P>68575-0942</P>
      <P>United Kingdom</P>
    </InfoField>
    <InfoField>
      <Row>
        <Icon src={mailIcon} />
        <Label>Email</Label>
      </Row>
      <Mail href="mailto:Jayne.Balistreri5@example.com">
        Jayne.Balistreri5@example.com
      </Mail>
    </InfoField>
    <InfoField>
      <Row>
        <Icon src={phoneIcon} />
        <Label>Phone</Label>
      </Row>
      <P>639.155.4520</P>
    </InfoField>
    <InfoField>
      <Row>
        <Icon src={socialIcon} />
        <Label>Social</Label>
      </Row>
      <Row>
        <NoDecorationLink to="/">
          <Icon src={fbIcon} />
        </NoDecorationLink>
        <NoDecorationLink to="/">
          <Icon src={instagramIcon} />
        </NoDecorationLink>
        <NoDecorationLink to="/">
          <Icon src={twitterIcon} />
        </NoDecorationLink>
        <NoDecorationLink to="/">
          <Icon src={youtubeIcon} />
        </NoDecorationLink>
      </Row>
    </InfoField>
  </React.Fragment>
);

class ContactForm extends Component {
  state = {
    name: '',
    email: '',
    message: '',
    btnText: 'Send',
    sent: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    if (e.target.name === 'email') {
      if (e.target.validity.valid) {
        this.setState({
          error: null
        });
      } else {
        this.setState({
          error: 'Enter valid email'
        });
      }
    }
  };

  submit = e => {
    e.preventDefault();
    const { name, error, email, message } = this.state;
    const isEnabled =
      name.length > 0 && email.length > 0 && message.length > 0 && !error;
    if (!isEnabled) {
      // form is not properly filled
      // show proper message
    } else {
      //submit form
      this.setState({ btnText: 'Sending...' });
      setTimeout(() => this.setState({ sent: true, btnText: 'Sent' }), 1000);
    }
  };

  render() {
    const { name, error, email, message, sent, btnText } = this.state;
    const isEnabled =
      name.length > 0 && email.length > 0 && message.length > 0 && !error;
    return (
      <Form onSubmit={this.submit}>
        <Label htmlFor="name">Name</Label>
        <StyledInput
          onChange={this.handleChange}
          value={name}
          type="text"
          name="name"
          id="name"
        />
        <Label htmlFor="email">Email</Label>
        <StyledInput
          onChange={this.handleChange}
          value={email}
          type="email"
          name="email"
          id="email"
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Label htmlFor="message">Message</Label>
        <StyledTextarea
          onChange={this.handleChange}
          value={message}
          name="message"
          id="message"
          cols="30"
          rows="10"
        />
        <Button
          color={!isEnabled ? 'disabled' : sent ? 'green' : 'primary'}
          disabled={!isEnabled}
        >
          {btnText}
        </Button>
      </Form>
    );
  }
}

const StyledInput = styled.input`
  border: none;
  padding: 2px 6px;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 600;
  color: rgb(40, 40, 40);
  border-bottom: 2px solid lightgray;

  :invalid {
    border-bottom: 3px solid red;
  }
`;

const StyledTextarea = styled.textarea`
  margin-bottom: 30px;
  padding: 2px 6px;
  font-size: 14px;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 700;
  color: rgb(40, 40, 40);
  border: 2px solid lightgray;
`;

const ErrorMessage = styled.p`
  border-left: 3px solid red;
  background-color: #fff9ed;
  color: #744f11;
  padding: 4px 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
