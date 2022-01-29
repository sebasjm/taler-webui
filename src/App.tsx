import { Fragment, h, VNode } from "preact";
import { Button } from "./components/Button";
import { Stack } from "./components/Stack";
import DeleteIcon from "./svg/delete_24px.svg";
import SendIcon from "./svg/send_24px.svg";
// import { css } from "@linaria/core";

export function App(): VNode {
  return (
    <Fragment>
      <Stack>
        <Button size="small" variant="text">
          Text
        </Button>
        <Button size="small" variant="contained">
          Contained
        </Button>
        <Button size="small" variant="outlined">
          Outlined
        </Button>
      </Stack>
      <Stack>
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
      <Stack>
        <Button size="large" variant="text">
          Text
        </Button>
        <Button size="large" variant="contained">
          Contained
        </Button>
        <Button size="large" variant="outlined">
          Outlined
        </Button>
      </Stack>
      <Stack>
        <Button color="secondary">Secondary</Button>
        <Button variant="contained" color="success">
          Success
        </Button>
        <Button variant="outlined" color="error">
          Error
        </Button>
      </Stack>
      <Stack>
        <Button disabled variant="text">
          Text
        </Button>
        <Button disabled variant="contained">
          Contained
        </Button>
        <Button disabled variant="outlined">
          Outlined
        </Button>
      </Stack>
      <Stack>
        <Button variant="outlined" startIcon={<DeleteIcon />}>
          Delete
        </Button>
        <Button variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </Stack>
    </Fragment>
  );
}
