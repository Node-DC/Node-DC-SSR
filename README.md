# Objective
The Node-DC is an open source collaboration project to develop workloads representing realistic use cases of Node.js in the data center. It started in 2016 with collaboration from the open source community, Node.js experts and companies playing important roles in Node.js’s evolution and production deployments in the data centers.

Workloads APIs, functionalities and metrics will be used to evaluate performance of the complete software stack for Node.js, Operating Systems, containers, virtualization, network stacks as well as various data center configuration choices. These are relevant for hardware and software developers, researchers and Node.js community. One priority for this project is to update the workloads in order to keep them up with the fast moving eco-system of Node.js.

# Contributing and Community

## Contribution to individual projects:
If you want to contribute code to a project, first you need to fork the project. Next step is to send a pull request (PR) for review to the repository. For small changes, you can implement at first step and for large changes, it is recommended to initially send the architecture and data flow, before investing significant time into the detailed implementation. The PR will be reviewed by the project team members. You need one "Looks Good To Me (LGTM)" and no objections from the project members. Once you have gained the required approval, the project maintainers will merge the PR.

# Node-DC-SSR (Node.js - Data Center - Server Side Rendering)

This is second in a series of upcoming workloads for modeling use cases of Node.js in Data Center (Node-DC). This workload is modeling server side rendering use cases.

Node-DC-SSR-electrode is built on top of the [@WalmartLabs Electrode Universal React/Node Application Framework](http://www.electrode.io/site/web.html).

# Node-DC-SSR
Node-DC-SSR consists of two components: a client and a Node.js server.

## Client (Node-DC-EIS-client)
Client controls various phases like ramp-up, measurement and ramp-down as well as issues requests, tracks response time and errors. At the end of run, it validates the runs and post-processes the transactions log producing final metrics and graphs.

## Node.js server (Node-DC-SSR-electrode)
Node.js server accepts all requests from client and responds back after generating HTML code.

# Node-DC-SSR Metrics  
Node-DC-SSR produces two primary metrics:
  - Throughput ( requests / second ): It is calculated by "requests in measurement phase / measurement time" 
  - p99 Response Time: It is 99 percentile of response time. 

Report also contains detailed response time data like minimum, maximum, average and p99 (99 percentile) of response time. 
Post-processing also produces response time graph as well as other histograms like memory utilization over the run length of the workload.

# Node-DC-SSR default and configurable options for research and testing  
Node-DC-SSR sets all parameters by default to model typical Node.js server deployment. Many important parameters have been defined in the configuration files to make it easy to be able to evaluate, test and validate wide variety of deployments.

Most parameters can be set in the client configuration file and these are passed to Node.js server. But some parameters must be set at the start of Node.js server. Such parameters must be defined in configuration files for respective components.

## Parameters in client configuration file ( Node-DC-EIS-client/config-ssr.json ) :
- "client_params"
  - "MT_interval": "100", // Runtime in Seconds
  - "request": "10000",  // Total number of requests to be issued
  - "concurrency": "200", // That many requests can be issued in parallel
  - "run_mode": "1", // 1 for time based run. 2 for request based run. Default is 1
  - "interval": "10", // Interval after which logging switches to next temp log file
  - "rampup_rampdown": "25", // After this many requests, execution will enter measurement phase
  - "tempfile": "RTdata", // Default name of the log file
  - "total_urls": "100", // Number of urls which will be used to issue requests
  - "server_ipaddress": "localhost", // Server IP address
  - "server_port": "3000", // Server port
  - "root_endpoint": "/",
  - "no_db": true, //  Skips all database loading and checking actions
  - "get_endpoints": ["count/10000/15"], // Directly specific which endpoints to use during operations (bypasses id, name, and zip ratios)
  - "http_headers": ["User-Agent: Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36"], // Extra HTTP headers to send to the server
  - "html": //
- "memory_params": // Parameters below helps in profiling memory usages by Node.js server
  - "memstat_interval": "1",
  - "memlogfile": "memlog_file"

## Parameters in server configuration file ( Node-DC-SSR-electrode/config/default.js ) :

  - "address": HOST_IP environmental variable or '0.0.0.0', // Listening address for server
  - "port": PORT environmental variable or 3000, // Listening port for server

# Node-DC-SSR-electrode Endpoints

This workload has three endpoints

- /product/\<random seed\>
  - Sample product page using React and material-ui
- /random/\<random seed\>
  - Random number of tags based on seed
- /count/\<number of tags to generate\>/\<depth\>
  - Specific number of tags nested up to depth times

# Content  

Node-DC-SS workload code, which contains following directories,
Server Codebase:
  - Node-DC-SSR-electrode

Client driver codebase
  - Node-DC-EIS-client

#### NOTE : 
If proxy needs to be set up, make sure the it has been properly set.
  - (npm config set proxy http://proxy.example.com:8080)
  - (npm config set https-proxy http://proxy.example.com:8080)

# Client Setup  

## Linux Client: Required Modules and Installations

  - Install Python 2.7.10
  - NumPy version '1.8.2' (command: pip install numpy)
  - Matplotlib '1.4.2'    (command: sudo apt-get install python-matplotlib)
  - requests '2.10.0'     (command: sudo pip install requests)
  - eventlet '0.19.0'     (command: sudo pip install eventlet)

#### NOTE: 
Please make sure above modules are installed without any error.

Install any missing modules as per your system configuration.

## Windows Client: Required Modules and Installations

Download Python from https://www.python.org/downloads/
  - Python 2.7.12 (2.7.10 – tested ). 

Download "Windows x86 MSI installer. Once you have downloaded the Python MSI, navigate to the download location on your computer, double clicking the file and pressing Run when the dialog box pops up.
  - Follow the instructions in the dialog box
  - Once python is installed add Python to System Path Variable in the System environment variables
  - If you are behind a proxy set your proxy
  - Install pip.py from https://pip.pypa.io/en/stable/installing/ and follow the instruction for running it
  - Make sure that pip is installed and is in your path before continuing installation
  - NumPy version '1.11.2' (command: pip install numpy)
  - Matplotlib 1.5.3       (command: pip install matplotlib)
  - requests '2.11.1'      (command: pip install requests)
  - eventlet '0.19.0'      (command: pip install eventlet)

#### NOTE: 

Please make sure above modules are installed without any error.
Install any missing modules as per your system configuration.

# Server Setup  

Install the following:
  - node.js (www.nodejs.org)

## Server Preparation:

  - Make sure node.js and npm (node package manager) have been installed.
  - Set PATH pointing to node.js binary you installed.
  - Make sure npm is in your PATH.
 
### Starting server

Running application server (default port: 3000): 
  - Change directory to Node-DC-SSR-electrode,
  - Run "npm install" to install all dependencies (don't use sudo). 
  - Build server with "node node_modules/xclap/bin/clap.js build"
  - Start server with "NODE_ENV=production node node_modules/xclap/bin/clap.js server"

# Testing:

Make sure you have access to the Node-DC-EIS-client, which contains client driver program and other supporting files.

- config-ssr.json: 
  The input configuration file to set default parameters such as,
  - Client parameters,
    - numbers of total_requests to issue,
    - number of concurrent requests,
    - total number of dynamic urls to use,
    - which SSR endpoints to use,
    - which Browser to masquerade as (defaults to Chrome's user-agent string)

  - Server parameters,
    - server ipaddress and port number.

- runspec.py:
  A top-level runspec script; the main script to launch workload. This script initiates, track requests, generates log file, and output graphs. Use config-ssr.json for setting parameters. This needs to be use -f option. User can override all parameters from the command line as well.
  - Invoke "runspec.py -h" for detail help

- node-dc-eis-testurls.py:
  The workload driver file which sends actual requests using python's requests module to the server.

- summary_file_sample.txt:
  Sample summary file that is generated after a run.

- results_node_dc: 
  Sub directory with timestamp, will be created after the run.
    - Temporary log file with following details for every request,
      request-number, issue time, response time.
    - Summary file with,
      - client information, 
      - database information,
      - hardware, software, version details and
      - summarized throughput, min max,average response time.
    - Three output graphs (throughput, latency and memory utilization graphs).

# Platforms Tested ON:
 
 TODO

# Known issues/limitations:
 
  - Following issues are observed while installing python and related dependencies
    - Tool "pip" is not installed by default with Python
  - Proxy errors while using pip and npm
  - NPM is not build if use your own build of Node.js
