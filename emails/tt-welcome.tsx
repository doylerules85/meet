import { Head, Html, Link, Preview } from '@react-email/components';
import { Body } from '@react-email/components';
import { Container } from '@react-email/components';
import { Heading } from '@react-email/components';
import { Text } from '@react-email/components';
import { Img } from '@react-email/components';

export const TTWelcomeEmail = () => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to TeachTeach!</Preview>
      <Body style={body}>
        <Container style={main}>
          <Img src="/static/email-welcome-feat.jpg" alt="TeachTeach" style={img} />
          <Heading style={heading}>Welcome to TeachTeach.</Heading>
          <Text style={text}>Thank you for signing up. We're excited to have you on board.</Text>
          <Text style={text}>Review resources to get started.</Text>
          <Text style={text}> Ready for your first meeting? </Text>
          <Link href="https://teachteach.com" style={link}>
            Get Pro Today
          </Link>
        </Container>
      </Body>
    </Html>
  );
};

const body = {
  backgroundColor: '#f6f9fc',
  fontFamily: 'Roboto, sans-serif',
};

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: 'Roboto, sans-serif',
  padding: '20px 20px',
  border: '1px solid #121212',
  borderRadius: '10px',
  margin: '0 auto',
};

const heading = {
  fontSize: 21,
  color: '#121212',
  textTransform: 'uppercase' as const,
};

const text = {
  fontSize: 16,
  color: '#121212',
};

const img = {
  borderRadius: '6px',
  maxHeight: '200px',
  width: '100%',
  height: 'auto',
  marginBottom: '30px',
};

const link = {
  backgroundColor: '#fffc9e',
  color: '#121212',
  textDecoration: 'none',
  padding: '10px 20px',
  borderRadius: '6px',
  fontSize: 14,
  textTransform: 'uppercase' as const,
  display: 'inline-block',
  marginTop: '20px',
  border: '1px solid #121212',
};

export default TTWelcomeEmail;
