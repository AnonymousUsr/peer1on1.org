import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../layout'
import ActivityCard from '../components/ActivityCard'
import Carousel from '../components/Carousel'
import BlogRollCard from '../components/BlogRollCard'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import carousels from '../../data/carousels'
import coverPhoto from '../../content/images/cover-blue.svg'
import peer1on1logo from '../images/logo.png'
import heroImg from '../../static/background-16-9.svg'
// import heroImg from '../../content/images/parks-clipart.png'
import ImageCarousel from '../components/CarouselHero'
import styled from 'styled-components';
import EventRegistryForm from '../components/Forms/eventRegistryForm'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import BoxedHeader from '../components/BoxedHeader'
import NewsListingItem from '../components/NewsListItem'

// Center child divs inside parent div
const ImageCarouselContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const BackgroundImgContainer = styled.div`
    background-image: url(${props => props.src});
    min-height: calc(100vh - 6.5rem);
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  background: #FFF;
  box-shadow: 0 0 12px #999;
`;

const StyledGridRoot = styled.div`
  flex-grow: 1;
`;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export default class Index extends Component {
  render() {
    const { data } = this.props
    const activity = { }

    const registryForm = <EventRegistryForm open={false} style={{width: '600px'}}/>
    return (
      <Layout>
        <Helmet title={`${config.siteTitle}`} />
        {/* <BackgroundImgContainer src={heroImg}> */}

        <ImageCarouselContainer >
          <div style={{width: '100%', height: '400px', maxWidth: '1000px'}}>
            <Carousel carousels={carousels} />
            {/* <ImageCarousel carousels={carousels} /> */}
          </div>
        </ImageCarouselContainer> 
        <div className="container">
          <StyledGridRoot>
            <Grid container spacing={2}>
              <Grid item md>
                <Grid container justify="center" spacing={2}>
                  <Grid item sm>
                    <BoxedHeader description="UPCOMING EVENT"></BoxedHeader>
                  </Grid>
                  <Grid item sm>
                    <BoxedHeader description="LATEST NEWS"></BoxedHeader>
                    <NewsListingItem title="Card Making" link="/2019-10-19-card-making" date="October 19, 2019"></NewsListingItem>
                  </Grid>
                </Grid>   
             </Grid>
            </Grid>
          </StyledGridRoot>
        </div>
{/*      
        <div className="container front-page" style={{maxWidth: 500, marginTop: 30}}>
          <ActivityCard activity={activity} registryForm={registryForm} />
        </div>
       */}   
        {/* </BackgroundImgContainer> */}
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 6
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
            template
          }
        }
      }
    }
  }
`
