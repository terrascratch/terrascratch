# scratch-iac

some programming languages have interactive and visual tools for learning, such as [Python Tutor](https://pythontutor.com/) (which includes JavaScript, C/C++, and Java) and [Scratch](https://scratch.mit.edu/), which is our inspiration for the development of the project, but there is no tool like that for learning [infrastructure as code](https://www.redhat.com/en/topics/automation/what-is-infrastructure-as-code-iac) (IaC).

what are the common ways to learn IaC? video tutorials and documentation? **boooooring**. our playground transforms a graphical view of the infrastructure into [OpenTF](https://github.com/opentffoundation/opentf) code (formerly [Terraform](https://www.terraform.io/)), making it easier to read and understand the code and providing an interactive way to learn IaC, where you can build your infrastructure code from scratch.

## what do you need to know?

ideally, you should have knowledge of the basics of cloud and computer networks. for example, you should known what is a network and a subnet, what is a firewall, what are sockets, etc. besides that, the only thing you need is creativity to build your infrastructure and see it as OpenTF.

## how can i use this tool?

the easiest way is accessing our [playground](https://scratch-iac.vercel.app/) and start scratching.

the other way is cloning the project and adding your own super secret infrastructure templates, that's why you don't want to contribute publicly to the project :c

### how i run the project locally?

just choose a node package manager of your preference (bun, npm, yarn, pnpm, ...) and run:

```sh
npm install && npm run dev
```

access `http://localhost:3000` and you are ready to go

## supported components and cloud providers

the project is still a embryo so, for now, we only support AWS.

### [AWS](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)

* EC2
* Security Groups
* VPC's
* Subnets

### [GCP](https://cloud.google.com/)

...

### [Hetzner](https://www.hetzner.com/)

...

### [Oracle Cloud](https://www.oracle.com/)

...

## contributing

the main way to contribute to our project is to develop templates that will be used by our parser for conversion into OpenTF code. to do this you need to:

### global templates

TODO

### component templates

TODO

## license

we follow MIT license. see on [LICENSE]('./LICENSE')
