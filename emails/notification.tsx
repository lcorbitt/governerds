import { Heading, Text } from "@react-email/components";

import { EmailLayout } from "./components/email-layout";

export interface NotificationProps {
  heading: string;
  body: string;
}

export function Notification({ heading, body }: NotificationProps) {
  return (
    <EmailLayout preview={heading}>
      <Heading style={headingStyle}>{heading}</Heading>
      <Text>{body}</Text>
    </EmailLayout>
  );
}

export default Notification;

const headingStyle = { fontSize: "20px", fontWeight: 600 };
