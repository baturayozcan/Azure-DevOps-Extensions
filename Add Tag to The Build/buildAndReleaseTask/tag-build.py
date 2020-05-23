import requests
from requests.auth import HTTPBasicAuth
import logging
import optparse

# SYSTEM_COLLECTIONURI
# SYSTEM_TEAMPROJECT
# BUILD_BUILDID
# BUILD_SOURCEBRANCHNAME

def decideTag(branch_name):
    tag = ''
    if branch_name.startswith('release'):
        tag = 'release'
    else:
        tag = 'development'
    return tag

def tagBuild(collection_uri, project_name, build_id, tag):
    uri = collection_uri + project_name + '/_apis/build/builds/' + build_id + '/tags/' + tag + '?api-version=5.0'
    try:
        requests.put(uri, auth=HTTPBasicAuth(PAT,PAT))
        logging.info('Build ' + build_id + 'has been tagged with the tag: ' + tag)
    except Exception as e:
        logging.error(e)

def main():
    logging.basicConfig(level=logging.INFO)
    parser = optparse.OptionParser()
    parser.add_option('-c', '--collection', help='collection uri', dest='collection')
    parser.add_option('-p', '--project', help='project name', dest='project')
    parser.add_option('-i', '--id', help='ID of the build', dest='id')
    parser.add_option('-b', '--branch', help='branch name', dest='branch')
    (opts, args) = parser.parse_args()
    if (opts.collection is None) or (opts.project is None) or (opts.id is None) or (opts.branch is None):
        logging.error("A mandatory option is missing.\n")
        parser.print_help()
        exit(-1)
    tag = decideTag(opts.branch)
    tagBuild(opts.collection, opts.project, opts.id, tag)



#Global Variables
PAT = ''

# Main Code
if __name__ == '__main__':
    main()