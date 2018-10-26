import React, { Component } from 'react'
import { Tabs, TabsPanel, TabTitle, TabsContainer, Tab } from '../../Components/Tabs'
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(0, auto) minmax(auto, 960px) minmax(0, auto);
`

const MainContent = styled.div`
  grid-column: 2 / span 1;
  padding-top: 80px;
  position: relative;
`

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
                <h2>Test1</h2>
                <p>Laboriosam numquam mollitia totam minima ut vel molestiae assumenda optio. Quisquam magni totam voluptatem porro ex velit aut. Ea aliquam quam tenetur dolorem vero molestiae officia. Commodi qui ea id id. Nihil rerum rerum ut quis maxime quam.</p>
              </Tab>
              <Tab>
                <h2>Test2</h2>
                <p>Laboriosam numquam mollitia totam minima ut vel molestiae assumenda optio. Quisquam magni totam voluptatem porro ex velit aut. Ea aliquam quam tenetur dolorem vero molestiae officia. Commodi qui ea id id. Nihil rerum rerum ut quis maxime quam.</p>
              </Tab>
              <Tab>
                <h2>Test3</h2>
                <p>Laboriosam numquam mollitia totam minima ut vel molestiae assumenda optio. Quisquam magni totam voluptatem porro ex velit aut. Ea aliquam quam tenetur dolorem vero molestiae officia. Commodi qui ea id id. Nihil rerum rerum ut quis maxime quam.</p>
              </Tab>
            </TabsContainer>
          </Tabs>
        </MainContent>
      </Container>
    )
  }
}
