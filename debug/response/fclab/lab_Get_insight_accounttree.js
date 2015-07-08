define(function (require, exports, module) {
    var tpl = require('../../lib/tpl');
    var rand = require('../../lib/rand');

    module.exports = function (path, param) {
        var rel = {
            'status': '200',
            'data': {
                'wordcount': '90203',
                'plans': {
                    '108312': {
                        'planid': '108312',
                        'planname': '鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花计划1',
                        'wordcount': '9',
                        'units': {
                            '1009731': {
                                'unitid': '1009731',
                                'unitname': '鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花单元1-1',
                                'wordcount': '14',
                                'words': {
                                    '10098113': {
                                        'winfoid': '10098113',
                                        'showword': '鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花'
                                    },
                                    '10098114': {
                                        'winfoid': '10098114',
                                        'showword': '北京鲜花'
                                    },
                                    '10098115': {
                                        'winfoid': '10098115',
                                        'showword': '鲜花'
                                    },
                                    '10098116': {
                                        'winfoid': '10098116',
                                        'showword': '鲜花6'
                                    },
                                    '10098117': {
                                        'winfoid': '10098117',
                                        'showword': '鲜花'
                                    },
                                    '10098118': {
                                        'winfoid': '10098118',
                                        'showword': '鲜花'
                                    },
                                    '10098119': {
                                        'winfoid': '10098119',
                                        'showword': '鲜花'
                                    },
                                    '10098120': {
                                        'winfoid': '10098120',
                                        'showword': '鲜花20'
                                    },
                                    '10098121': {
                                        'winfoid': '10098121',
                                        'showword': '鲜花21'
                                    }
                                }
                            }
                        }
                    },
                    '108313453': {
                        'planid': '108313453',
                        'planname': '计划2',
                        'wordcount': '20',
                        'units': {
                            '1009731': {
                                'unitid': '1009731',
                                'unitname': '单元1-1',
                                'wordcount': '14',
                                'words': {
                                    '1': {
                                        'winfoid': '1',
                                        'showword': '鲜花'
                                    },
                                    '2': {
                                        'winfoid': '2',
                                        'showword': '北京鲜花'
                                    },
                                    '3': {
                                        'winfoid': '3',
                                        'showword': '鲜花'
                                    },
                                    '4': {
                                        'winfoid': '4',
                                        'showword': '鲜花6'
                                    },
                                    '5': {
                                        'winfoid': '5',
                                        'showword': '鲜花'
                                    },
                                    '6': {
                                        'winfoid': '6',
                                        'showword': '鲜花'
                                    },
                                    '7': {
                                        'winfoid': '7',
                                        'showword': '鲜花'
                                    },
                                    '8': {
                                        'winfoid': '8',
                                        'showword': '鲜花20'
                                    },
                                    '9': {
                                        'winfoid': '9',
                                        'showword': '鲜花21'
                                    }
                                }
                            }
                        }
                    },
                    '1313453': {
                        'planid': '1313453',
                        'planname': '计划2',
                        'wordcount': '20',
                        'units': {
                            '1009731': {
                                'unitid': '1009731',
                                'unitname': '单元1-1',
                                'wordcount': '14',
                                'words': {
                                    '10': {
                                        'winfoid': '10',
                                        'showword': '鲜花'
                                    },
                                    '11': {
                                        'winfoid': '11',
                                        'showword': '北京鲜花'
                                    },
                                    '12': {
                                        'winfoid': '12',
                                        'showword': '鲜花'
                                    },
                                    '13': {
                                        'winfoid': '13',
                                        'showword': '鲜花6'
                                    },
                                    '14': {
                                        'winfoid': '14',
                                        'showword': '鲜花'
                                    },
                                    '15': {
                                        'winfoid': '15',
                                        'showword': '鲜花'
                                    },
                                    '16': {
                                        'winfoid': '16',
                                        'showword': '鲜花'
                                    },
                                    '17': {
                                        'winfoid': '17',
                                        'showword': '鲜花20'
                                    },
                                    '18': {
                                        'winfoid': '18',
                                        'showword': '鲜花21'
                                    }
                                }
                            }
                        }
                    },
                    '108313': {
                        'planid': '108313',
                        'planname': '计划2',
                        'wordcount': '20',
                        'units': {
                            '1009731': {
                                'unitid': '1009731',
                                'unitname': '单元1-1',
                                'wordcount': '14',
                                'words': {
                                    '10098113': {
                                        'winfoid': '10098113',
                                        'showword': '鲜花'
                                    },
                                    '10098114': {
                                        'winfoid': '10098114',
                                        'showword': '北京鲜花'
                                    },
                                    '10098115': {
                                        'winfoid': '10098115',
                                        'showword': '鲜花'
                                    },
                                    '10098116': {
                                        'winfoid': '10098116',
                                        'showword': '鲜花6'
                                    },
                                    '10098117': {
                                        'winfoid': '10098117',
                                        'showword': '鲜花'
                                    },
                                    '10098118': {
                                        'winfoid': '10098118',
                                        'showword': '鲜花'
                                    },
                                    '10098119': {
                                        'winfoid': '10098119',
                                        'showword': '鲜花'
                                    },
                                    '10098120': {
                                        'winfoid': '10098120',
                                        'showword': '鲜花20'
                                    },
                                    '10098121': {
                                        'winfoid': '10098121',
                                        'showword': '鲜花21'
                                    }
                                }
                            }
                        }
                    },
                    '103': {
                        'planid': '103',
                        'planname': '计划2',
                        'wordcount': '20',
                        'units': {
                            '1009731': {
                                'unitid': '1009731',
                                'unitname': '单元1-1',
                                'wordcount': '14',
                                'words': {
                                    '10098113': {
                                        'winfoid': '10098113',
                                        'showword': '鲜花'
                                    },
                                    '10098114': {
                                        'winfoid': '10098114',
                                        'showword': '北京鲜花'
                                    },
                                    '10098115': {
                                        'winfoid': '10098115',
                                        'showword': '鲜花'
                                    },
                                    '10098116': {
                                        'winfoid': '10098116',
                                        'showword': '鲜花6'
                                    },
                                    '10098117': {
                                        'winfoid': '10098117',
                                        'showword': '鲜花'
                                    },
                                    '10098118': {
                                        'winfoid': '10098118',
                                        'showword': '鲜花'
                                    },
                                    '10098119': {
                                        'winfoid': '10098119',
                                        'showword': '鲜花'
                                    },
                                    '10098120': {
                                        'winfoid': '10098120',
                                        'showword': '鲜花20'
                                    },
                                    '10098121': {
                                        'winfoid': '10098121',
                                        'showword': '鲜花21'
                                    }
                                }
                            }
                        }
                    },
                    '104': {
                        'planid': '104',
                        'planname': '计划2',
                        'wordcount': '20',
                        'units': {
                            '1009731': {
                                'unitid': '1009731',
                                'unitname': '单元1-1',
                                'wordcount': '14',
                                'words': {
                                    '10098113': {
                                        'winfoid': '10098113',
                                        'showword': '鲜花'
                                    },
                                    '10098114': {
                                        'winfoid': '10098114',
                                        'showword': '北京鲜花'
                                    },
                                    '10098115': {
                                        'winfoid': '10098115',
                                        'showword': '鲜花'
                                    },
                                    '10098116': {
                                        'winfoid': '10098116',
                                        'showword': '鲜花6'
                                    },
                                    '10098117': {
                                        'winfoid': '10098117',
                                        'showword': '鲜花'
                                    },
                                    '10098118': {
                                        'winfoid': '10098118',
                                        'showword': '鲜花'
                                    },
                                    '10098119': {
                                        'winfoid': '10098119',
                                        'showword': '鲜花'
                                    },
                                    '10098120': {
                                        'winfoid': '10098120',
                                        'showword': '鲜花20'
                                    },
                                    '10098121': {
                                        'winfoid': '10098121',
                                        'showword': '鲜花21'
                                    }
                                }
                            }
                        }
                    },
                    '105': {
                        'planid': '105',
                        'planname': '计划2',
                        'wordcount': '20',
                        'units': {
                            '1009731': {
                                'unitid': '1009731',
                                'unitname': '单元1-1',
                                'wordcount': '14',
                                'words': {
                                    '10098113': {
                                        'winfoid': '10098113',
                                        'showword': '鲜花'
                                    },
                                    '10098114': {
                                        'winfoid': '10098114',
                                        'showword': '北京鲜花'
                                    },
                                    '10098115': {
                                        'winfoid': '10098115',
                                        'showword': '鲜花'
                                    },
                                    '10098116': {
                                        'winfoid': '10098116',
                                        'showword': '鲜花6'
                                    },
                                    '10098117': {
                                        'winfoid': '10098117',
                                        'showword': '鲜花'
                                    },
                                    '10098118': {
                                        'winfoid': '10098118',
                                        'showword': '鲜花'
                                    },
                                    '10098119': {
                                        'winfoid': '10098119',
                                        'showword': '鲜花'
                                    },
                                    '10098120': {
                                        'winfoid': '10098120',
                                        'showword': '鲜花20'
                                    },
                                    '10098121': {
                                        'winfoid': '10098121',
                                        'showword': '鲜花21'
                                    }
                                }
                            }
                        }
                    },
                    '106': {
                        'planid': '106',
                        'planname': '计划2',
                        'wordcount': '20',
                        'units': {
                            '1009731': {
                                'unitid': '1009731',
                                'unitname': '单元1-1',
                                'wordcount': '14',
                                'words': {
                                    '10098113': {
                                        'winfoid': '10098113',
                                        'showword': '鲜花'
                                    },
                                    '10098114': {
                                        'winfoid': '10098114',
                                        'showword': '北京鲜花'
                                    },
                                    '10098115': {
                                        'winfoid': '10098115',
                                        'showword': '鲜花'
                                    },
                                    '10098116': {
                                        'winfoid': '10098116',
                                        'showword': '鲜花6'
                                    },
                                    '10098117': {
                                        'winfoid': '10098117',
                                        'showword': '鲜花'
                                    },
                                    '10098118': {
                                        'winfoid': '10098118',
                                        'showword': '鲜花'
                                    },
                                    '10098119': {
                                        'winfoid': '10098119',
                                        'showword': '鲜花'
                                    },
                                    '10098120': {
                                        'winfoid': '10098120',
                                        'showword': '鲜花20'
                                    },
                                    '10098121': {
                                        'winfoid': '10098121',
                                        'showword': '鲜花21'
                                    }
                                }
                            }
                        }
                    },
                    '107': {
                        'planid': '107',
                        'planname': '计划2',
                        'wordcount': '20',
                        'units': {
                            '1009731': {
                                'unitid': '1009731',
                                'unitname': '单元1-1',
                                'wordcount': '14',
                                'words': {
                                    '10098113': {
                                        'winfoid': '10098113',
                                        'showword': '鲜花'
                                    },
                                    '10098114': {
                                        'winfoid': '10098114',
                                        'showword': '北京鲜花'
                                    },
                                    '10098115': {
                                        'winfoid': '10098115',
                                        'showword': '鲜花'
                                    },
                                    '10098116': {
                                        'winfoid': '10098116',
                                        'showword': '鲜花6'
                                    },
                                    '10098117': {
                                        'winfoid': '10098117',
                                        'showword': '鲜花'
                                    },
                                    '10098118': {
                                        'winfoid': '10098118',
                                        'showword': '鲜花'
                                    },
                                    '10098119': {
                                        'winfoid': '10098119',
                                        'showword': '鲜花'
                                    },
                                    '10098120': {
                                        'winfoid': '10098120',
                                        'showword': '鲜花20'
                                    },
                                    '10098121': {
                                        'winfoid': '10098121',
                                        'showword': '鲜花21'
                                    }
                                }
                            }
                        }
                    },
                    '108': {
                        'planid': '108',
                        'planname': '计划2',
                        'wordcount': '20',
                        'units': {
                            '1009731': {
                                'unitid': '1009731',
                                'unitname': '单元1-1',
                                'wordcount': '14',
                                'words': {
                                    '10098113': {
                                        'winfoid': '10098113',
                                        'showword': '鲜花'
                                    },
                                    '10098114': {
                                        'winfoid': '10098114',
                                        'showword': '北京鲜花'
                                    },
                                    '10098115': {
                                        'winfoid': '10098115',
                                        'showword': '鲜花'
                                    },
                                    '10098116': {
                                        'winfoid': '10098116',
                                        'showword': '鲜花6'
                                    },
                                    '10098117': {
                                        'winfoid': '10098117',
                                        'showword': '鲜花'
                                    },
                                    '10098118': {
                                        'winfoid': '10098118',
                                        'showword': '鲜花'
                                    },
                                    '10098119': {
                                        'winfoid': '10098119',
                                        'showword': '鲜花'
                                    },
                                    '10098120': {
                                        'winfoid': '10098120',
                                        'showword': '鲜花20'
                                    },
                                    '10098121': {
                                        'winfoid': '10098121',
                                        'showword': '鲜花21'
                                    }
                                }
                            }
                        }
                    },
                    '109': {
                        'planid': '109',
                        'planname': '计划2',
                        'wordcount': '20',
                        'units': {
                            '1009731': {
                                'unitid': '1009731',
                                'unitname': '单元1-1',
                                'wordcount': '14',
                                'words': {
                                    '10098113': {
                                        'winfoid': '10098113',
                                        'showword': '鲜花'
                                    },
                                    '10098114': {
                                        'winfoid': '10098114',
                                        'showword': '北京鲜花'
                                    },
                                    '10098115': {
                                        'winfoid': '10098115',
                                        'showword': '鲜花'
                                    },
                                    '10098116': {
                                        'winfoid': '10098116',
                                        'showword': '鲜花6'
                                    },
                                    '10098117': {
                                        'winfoid': '10098117',
                                        'showword': '鲜花'
                                    },
                                    '10098118': {
                                        'winfoid': '10098118',
                                        'showword': '鲜花'
                                    },
                                    '10098119': {
                                        'winfoid': '10098119',
                                        'showword': '鲜花'
                                    },
                                    '10098120': {
                                        'winfoid': '10098120',
                                        'showword': '鲜花20'
                                    },
                                    '10098121': {
                                        'winfoid': '10098121',
                                        'showword': '鲜花21'
                                    }
                                }
                            }
                        }
                    },
                    '110': {
                        'planid': '110',
                        'planname': '计划2',
                        'wordcount': '20',
                        'units': {
                            '1009731': {
                                'unitid': '1009731',
                                'unitname': '单元1-1',
                                'wordcount': '14',
                                'words': {
                                    '10098113': {
                                        'winfoid': '10098113',
                                        'showword': '鲜花'
                                    },
                                    '10098114': {
                                        'winfoid': '10098114',
                                        'showword': '北京鲜花'
                                    },
                                    '10098115': {
                                        'winfoid': '10098115',
                                        'showword': '鲜花'
                                    },
                                    '10098116': {
                                        'winfoid': '10098116',
                                        'showword': '鲜花6'
                                    },
                                    '10098117': {
                                        'winfoid': '10098117',
                                        'showword': '鲜花'
                                    },
                                    '10098118': {
                                        'winfoid': '10098118',
                                        'showword': '鲜花'
                                    },
                                    '10098119': {
                                        'winfoid': '10098119',
                                        'showword': '鲜花'
                                    },
                                    '10098120': {
                                        'winfoid': '10098120',
                                        'showword': '鲜花20'
                                    },
                                    '10098121': {
                                        'winfoid': '10098121',
                                        'showword': '鲜花21'
                                    }
                                }
                            }
                        }
                    }}},
    
    
            'errorCode': null
        };
    
        for (var i = 1; i < 5000; i++) {
            rel.data.plans['108312'].units['1009731'].words[i]={
                'winfoid': i,
                'showword': '鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花鲜花'+i
            };
        }
    
        return rel;
    };
});