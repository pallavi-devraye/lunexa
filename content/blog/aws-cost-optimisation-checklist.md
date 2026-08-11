---
title: "The AWS Cost Optimisation Checklist Most Teams Skip"
date: "2026-03-25"
tags: ["Cloud", "DevOps", "AWS", "Infrastructure"]
excerpt: "Cloud bills rarely grow because of traffic. They grow because of forgotten resources, over-provisioned instances, and defaults nobody revisited. Here is the audit we run, in the order that finds the most money soonest."
faqs:
  - question: "How much can a typical AWS bill be reduced?"
    answer: "For an environment that has grown organically for two or three years without a review, 25–45% is a common result, and most of it comes from right-sizing, deleting orphaned resources, and setting log retention rather than from anything architecturally clever."
  - question: "What is the single biggest source of AWS waste?"
    answer: "Over-provisioned compute. Instances sized for a launch-day load that never arrived, or sized by copying a previous project, then never revisited. CloudWatch usually shows single-digit CPU utilisation on the worst offenders."
  - question: "Are Savings Plans worth it?"
    answer: "Yes, once your baseline is stable and right-sized. Committing to a baseline you have already reduced typically saves a further 20–40% on that portion. Buying them before right-sizing locks in the waste, which is the common mistake."
  - question: "Why is my data transfer bill so high?"
    answer: "Usually cross-availability-zone traffic between services that did not need separating, NAT Gateway processing charges for traffic that could use a VPC endpoint, or egress that should be sitting behind a CDN. All three are invisible until you read the bill by usage type."
  - question: "Do we need Kubernetes to run efficiently?"
    answer: "Rarely. A small EKS cluster often costs more than the managed services it replaces once you include the control plane, the node overhead, and the engineering time to run it. ECS Fargate, App Runner, Lambda, or a managed platform is cheaper for most teams below real scale."
---

Cloud bills almost never grow because of traffic. They grow because a launch-sized instance was never resized, because a volume outlived the instance it was attached to, because log retention was left at "never expire" three years ago.

None of that is negligence. It is what happens when infrastructure is created by hand under deadline and nobody is assigned to revisit it. Here is the audit we run, ordered by how much money it typically finds per hour spent.

## 1. Right-size compute

The largest line item and the largest source of waste.

Pull two weeks of CloudWatch data for every EC2 instance, RDS instance, and ECS task definition. Look at maximum CPU and memory utilisation, not the average — averages hide the peaks you actually need to serve.

Anything sitting under 20% maximum CPU is a candidate to drop a size, and dropping one size halves the cost. Two sizes quarters it. Teams routinely find production databases provisioned for a load that has never occurred.

Also check the instance generation. Moving from an older generation to the current one on Graviton is frequently 15–25% cheaper for the same or better performance, and for most workloads it is a configuration change rather than a migration.

## 2. Delete what nobody owns

Orphaned resources accumulate silently, and each one is small enough that nobody notices.

- **Unattached EBS volumes.** Every terminated instance whose volume was not set to delete on termination left one behind.
- **Old EBS snapshots.** Almost every account has snapshots from years ago that no policy will ever remove.
- **Unassociated Elastic IPs.** Billed hourly while doing nothing.
- **Idle load balancers.** Pointing at target groups with no healthy targets.
- **Forgotten environments.** The staging stack for a project that shipped in 2024.
- **Empty NAT Gateways.** Charged hourly plus per gigabyte, in every availability zone.

Tag everything with an owner and a purpose as you go. Untagged resources are what this list is made of.

## 3. Set storage lifecycle rules

S3 costs are dominated by data that should have moved class months ago.

Analyse access patterns, then apply lifecycle rules: infrequent access after 30 days, Glacier Instant Retrieval after 90, Deep Archive after a year for anything you keep only for compliance. For buckets with genuinely unpredictable access, Intelligent-Tiering does this automatically for a small monitoring fee.

Two often-missed items: enable a rule to abort incomplete multipart uploads after seven days — these are invisible in the console but fully billed — and check whether versioning is on with no expiry, which quietly stores every version of every object forever.

## 4. Fix log retention

CloudWatch Logs defaults to never expiring. On a chatty application that is a line item that grows forever and is read approximately never.

Set retention deliberately: 7 to 14 days for debug and access logs, 30 to 90 for application logs, and longer only where a compliance requirement says so. If you genuinely need long retention, export to S3 and apply a lifecycle rule — it is a fraction of the CloudWatch price.

While you are there, check whether anything is logging at debug level in production. That single setting has been known to double an observability bill.

## 5. Read the data transfer lines

Data transfer is the charge most teams cannot explain, because the console does not surface it usefully. Open Cost Explorer, group by usage type, and look for these three:

**Cross-AZ traffic.** Services chatting across availability zones are billed in both directions. Sometimes that is the price of the resilience you wanted; often it is two components that had no reason to be separated.

**NAT Gateway processing.** Charged per gigabyte on top of the hourly rate. Traffic to S3, DynamoDB, and many AWS APIs can bypass it entirely through VPC endpoints, which frequently pays for itself immediately.

**Egress to the internet.** If you are serving assets straight from S3 or an origin server, CloudFront in front of it is usually cheaper as well as faster, because CDN egress is priced below origin egress.

## 6. Question the architecture

Some savings need a decision rather than a setting.

**Do you need Kubernetes?** A small EKS cluster carries a control plane charge, node overhead, and a meaningful engineering cost to operate. Below real scale, ECS Fargate, App Runner, Lambda, or a managed platform is usually cheaper in both cash and attention.

**Do you need three environments running around the clock?** Development and staging can be scheduled off outside working hours. A weekday-only schedule removes roughly 70% of their runtime.

**Do you need provisioned capacity for spiky work?** Batch jobs, CI runners, and media processing suit Spot instances, at up to 90% off, provided the work can be interrupted and retried.

## 7. Buy commitments — last, not first

Once the baseline is right-sized and the waste is gone, commit to what remains. Compute Savings Plans typically save 20–40% on the committed portion; RDS and ElastiCache reserved instances are similar.

The ordering is the whole point. Buying a three-year commitment against an over-provisioned fleet locks in the waste, and it is the most expensive mistake on this page precisely because it feels like cost management.

## Keeping it from coming back

An audit is a one-off; the bill grows continuously. Four practices keep the saving:

- **Budgets and alerts** at 50%, 80%, and 100% of expected monthly spend, going to a channel people actually read.
- **Mandatory tagging** enforced by policy — owner, environment, project — so every future line item has a name attached.
- **Infrastructure as code.** Resources created by hand are the ones that get orphaned. Terraform-managed resources are visible in a diff.
- **A quarterly review** with a named owner. Half a day, four times a year, is enough to keep an environment honest.

## What a real audit tends to find

For an environment that grew organically over two or three years, a first pass usually finds savings of 25–45% of monthly spend. The typical split: roughly half from right-sizing compute, a quarter from deleting orphaned resources and fixing retention, and the remainder from storage lifecycle and transfer fixes. Commitments then take a further bite out of what is left.

None of it is clever. It is just work that nobody was assigned, on resources nobody owned, against defaults nobody revisited.
