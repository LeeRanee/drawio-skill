# Cloud Icon Library

## AWS Icons (aws4)

| Component | Style |
|-----------|-------|
| EC2 | `shape=mxgraph.aws4.ec2;` |
| Lambda | `shape=mxgraph.aws4.lambda_function;` |
| S3 | `shape=mxgraph.aws4.s3;` |
| RDS | `shape=mxgraph.aws4.rds;` |
| DynamoDB | `shape=mxgraph.aws4.dynamodb;` |
| API Gateway | `shape=mxgraph.aws4.api_gateway;` |
| CloudFront | `shape=mxgraph.aws4.cloudfront;` |
| ELB/ALB | `shape=mxgraph.aws4.application_load_balancer;` |
| VPC | `shape=mxgraph.aws4.vpc;` |
| Route 53 | `shape=mxgraph.aws4.route_53;` |
| SNS | `shape=mxgraph.aws4.sns;` |
| SQS | `shape=mxgraph.aws4.sqs;` |
| Cognito | `shape=mxgraph.aws4.cognito;` |
| CloudWatch | `shape=mxgraph.aws4.cloudwatch;` |

**AWS Icon Template:**
```xml
<mxCell id="aws1" value="EC2" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;fillColor=#ED7100;strokeColor=none;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;pointerEvents=1;shape=mxgraph.aws4.ec2;" vertex="1" parent="1">
  <mxGeometry x="100" y="100" width="78" height="78" as="geometry"/>
</mxCell>
```

## GCP Icons (gcp2)

| Component | Style |
|-----------|-------|
| Compute Engine | `shape=mxgraph.gcp2.compute_engine;` |
| Cloud Functions | `shape=mxgraph.gcp2.cloud_functions;` |
| Cloud Storage | `shape=mxgraph.gcp2.cloud_storage;` |
| Cloud SQL | `shape=mxgraph.gcp2.cloud_sql;` |
| BigQuery | `shape=mxgraph.gcp2.bigquery;` |
| Pub/Sub | `shape=mxgraph.gcp2.pubsub;` |
| Cloud Run | `shape=mxgraph.gcp2.cloud_run;` |
| GKE | `shape=mxgraph.gcp2.google_kubernetes_engine;` |
| Load Balancing | `shape=mxgraph.gcp2.cloud_load_balancing;` |

**GCP Icon Template:**
```xml
<mxCell id="gcp1" value="Compute Engine" style="sketch=0;html=1;fillColor=#4285F4;strokeColor=none;verticalLabelPosition=bottom;verticalAlign=top;align=center;shape=mxgraph.gcp2.compute_engine;" vertex="1" parent="1">
  <mxGeometry x="100" y="100" width="68" height="68" as="geometry"/>
</mxCell>
```

## Azure Icons (azure2)

| Component | Style |
|-----------|-------|
| Virtual Machine | `image=img/lib/azure2/compute/Virtual_Machine.svg;` |
| App Service | `image=img/lib/azure2/app_services/App_Services.svg;` |
| Functions | `image=img/lib/azure2/compute/Function_Apps.svg;` |
| SQL Database | `image=img/lib/azure2/databases/SQL_Database.svg;` |
| Cosmos DB | `image=img/lib/azure2/databases/Azure_Cosmos_DB.svg;` |
| Blob Storage | `image=img/lib/azure2/storage/Blob_Block.svg;` |
| API Management | `image=img/lib/azure2/integration/API_Management_Services.svg;` |
| AKS | `image=img/lib/azure2/containers/Kubernetes_Services.svg;` |
| Load Balancer | `image=img/lib/azure2/networking/Load_Balancers.svg;` |

**Azure Icon Template:**
```xml
<mxCell id="az1" value="Virtual Machine" style="sketch=0;aspect=fixed;html=1;dashed=0;strokeColor=none;fillColor=#4285F4;verticalLabelPosition=bottom;verticalAlign=top;align=center;image=img/lib/azure2/compute/Virtual_Machine.svg;" vertex="1" parent="1">
  <mxGeometry x="100" y="100" width="68" height="68" as="geometry"/>
</mxCell>
```

## Kubernetes Icons

| Component | Style |
|-----------|-------|
| Pod | `shape=mxgraph.kubernetes.pod;` |
| Service | `shape=mxgraph.kubernetes.svc;` |
| Deployment | `shape=mxgraph.kubernetes.deploy;` |
| ConfigMap | `shape=mxgraph.kubernetes.cm;` |
| Secret | `shape=mxgraph.kubernetes.secret;` |
| Ingress | `shape=mxgraph.kubernetes.ing;` |
| PersistentVolume | `shape=mxgraph.kubernetes.pv;` |
| Namespace | `shape=mxgraph.kubernetes.ns;` |

## Generic Icons (Fallback)

Use when cloud-specific icons are not available:

| Concept | Style |
|---------|-------|
| Server | `shape=mxgraph.basic.rect;fillColor=#dae8fc;` |
| Database | `shape=cylinder3;whiteSpace=wrap;html=1;` |
| User | `shape=actor;` |
| Cloud | `ellipse;shape=cloud;whiteSpace=wrap;html=1;` |
| Storage | `shape=mxgraph.basic.layered_rect;` |
| Network | `shape=mxgraph.networks.bus;` |
